export const canNavigate = to => {
  const userdata = JSON.parse(localStorage.getItem('userdata'))
  let group = 0
  const metagroup = to.meta.group ? to.meta.group : 0
  if (userdata) {
    const { user } = userdata
    group = user.group_id
    if (to.meta.group === undefined) return true
  }
  return metagroup === group
}

export const _ = undefined
