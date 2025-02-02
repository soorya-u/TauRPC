// My header

// This file has been generated by Specta. DO NOT EDIT.

import { createTauRPCProxy as createProxy } from 'taurpc'

export type Error = { type: 'Io' } | { type: 'Other'; data: string }

/**
 * Doc comments are also generated
 */
export type User = {
  /**
   * The user's id
   */
  uid: number
  /**
   * The user's first name
   */
  first_name: string
  /**
   * The user's last name
   */
  last_name: string
}

const ARGS_MAP = {
  'api.ui': '{"trigger":[],"test_ev":[]}',
  'events':
    '{"multiple_args":["arg1","arg2"],"vec_test":["args"],"state_changed":["new_state"],"test_ev":[]}',
  '':
    '{"test_io":["_user"],"with_sleep":[],"update_state":["new_value"],"get_window":[],"test_result":["user"],"method_with_alias":[],"vec_test":["arg"],"test_bigint":["num"],"get_app_handle":[],"test_option":[],"ev":["updated_value"],"multiple_args":["arg","arg2"]}',
}
export type Router = {
  'api.ui': { trigger: () => Promise<void>; test_ev: () => Promise<void> }
  '': {
    update_state: (newValue: string) => Promise<void>
    get_window: () => Promise<void>
    get_app_handle: () => Promise<void>
    test_io: (user: User) => Promise<User>
    test_option: () => Promise<null | null>
    test_result: (user: User) => Promise<User>
    with_sleep: () => Promise<void>
    method_with_alias: () => Promise<void>
    ev: (updatedValue: string) => Promise<void>
    vec_test: (arg: string[]) => Promise<void>
    multiple_args: (arg: string[], arg2: string) => Promise<void>
    test_bigint: (num: string) => Promise<string>
  }
  'events': {
    test_ev: () => Promise<void>
    state_changed: (newState: string) => Promise<void>
    vec_test: (args: string[]) => Promise<void>
    multiple_args: (arg1: number, arg2: string[]) => Promise<void>
  }
}

export const createTauRPCProxy = () => createProxy<Router>(ARGS_MAP)
