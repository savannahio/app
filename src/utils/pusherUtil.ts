import Pusher, { AuthorizerCallback } from "pusher-js";
import { authApi } from "@api/project";
import { User } from "api-ts-axios";

export enum BroadcastEventTypes {
  UserUpdatedEvent = 'UserUpdatedEvent',
  UserUpdatedEmailEvent = 'UserUpdatedEmailEvent',
  UserVerifiedEmailEvent = 'UserVerifiedEmailEvent',
  UserPermissionsUpdatedEvent = 'UserPermissionsUpdatedEvent',
  UserRolesUpdatedEvent = 'UserRolesUpdatedEvent'
}

export type BroadcastEvents =
  | {event: BroadcastEventTypes.UserUpdatedEvent, payload: User}
  | {event: BroadcastEventTypes.UserUpdatedEmailEvent, payload: User}
  | {event: BroadcastEventTypes.UserVerifiedEmailEvent, payload: User}
  | {event: BroadcastEventTypes.UserPermissionsUpdatedEvent, payload: User}
  | {event: BroadcastEventTypes.UserRolesUpdatedEvent, payload: User}

export type BroadcastCallback = (event: BroadcastEvents) => void

export const connectToPusher = (user: User, onEventReceived: BroadcastCallback): void => {
  //  Pusher.logToConsole = true;
  // @ts-ignore
  const state = window.Pusher?.connection?.state
  if (state !== 'connected') {
    // @ts-ignore
    window.Pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY as string, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER as string,
      authorizer: (channel) => ({
        authorize: async (socketId: string, callback: AuthorizerCallback) => {
          try {
            const response = await authApi.authorizeBroadcasting({ AuthorizeBroadcastingRequest: { socket_id: socketId, channel_name: channel.name }})
            callback(null, response.data)
          } catch (error: any) {
            callback(error, { auth: '' })
          }
        }
      })
    })
    // @ts-ignore
    window.Pusher.connection.bind('connected', () => subscribeToChannels(window.Pusher, user, onEventReceived))
  }
}

export const disconnectFromPusher = () => {
  // @ts-ignore
  const state = window.Pusher?.connection?.state
  if (state === 'connected') {
    // @ts-ignore
    window.Pusher.disconnect()
  }
}

const subscribeToChannels = (pusher: Pusher, user: User, onEventReceived: BroadcastCallback): void => {
  const privateUsersChannel = `private-users.${user.id}`
  if (!pusher.channel(privateUsersChannel)) {
    pusher.subscribe(privateUsersChannel)
      .bind(BroadcastEventTypes.UserUpdatedEvent, (data: User) => onEventReceived({event: BroadcastEventTypes.UserUpdatedEvent, payload: data}))
      .bind(BroadcastEventTypes.UserUpdatedEmailEvent, (data: User) => onEventReceived({event: BroadcastEventTypes.UserUpdatedEmailEvent, payload: data}))
      .bind(BroadcastEventTypes.UserVerifiedEmailEvent, (data: User) => onEventReceived({event: BroadcastEventTypes.UserVerifiedEmailEvent, payload: data}))
      .bind(BroadcastEventTypes.UserPermissionsUpdatedEvent, (data: User) => onEventReceived({event: BroadcastEventTypes.UserPermissionsUpdatedEvent, payload: data}))
      .bind(BroadcastEventTypes.UserRolesUpdatedEvent, (data: User) => onEventReceived({event: BroadcastEventTypes.UserRolesUpdatedEvent, payload: data}))
  }
}