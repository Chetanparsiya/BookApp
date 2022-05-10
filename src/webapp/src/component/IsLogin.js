import React from 'react'

export function IsLogin() {
  return window.localStorage.getItem("token") !== null;
}
