use tauri::{Invoke, Runtime};

pub use serde::Serialize;
pub use ts_rs::TS;

pub use taurpc_macros::{procedures, rpc_struct};

pub trait TauRpcHandler<R: Runtime> {
    fn generate_ts_types();

    fn setup() -> String;

    fn handle_incoming_request(self, invoke: Invoke<R>);
}

/// Accepts procedure resolver struct for which `taurpc::procedures` is implemented.
///
///  # Examples
/// ```rust
/// #[taurpc::procedures]
/// trait Api {
///     fn hello_world();
/// }
///
/// struct ApiImpl;
/// impl Api for ApiImpl {
///     fn hello_world(self) {
///         println!("Hello world");
///     }
/// }
///
/// fn main() {
///   let _handler = taurpc::create_rpc_handler(ApiImpl.into_handler());
/// }
/// ```
pub fn create_rpc_handler<H, R>(procedures: H) -> impl Fn(Invoke<R>) + Send + Sync + 'static
where
    H: TauRpcHandler<R> + Send + Sync + 'static + Clone,
    R: Runtime,
{
    H::generate_ts_types();

    move |invoke: Invoke<R>| {
        let cmd = invoke.message.command();

        match cmd {
            "TauRPC__setup" => invoke.resolver.respond(Ok(H::setup())),
            _ => {
                procedures.clone().handle_incoming_request(invoke);
            }
        }
    }
}
