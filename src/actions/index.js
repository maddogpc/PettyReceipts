export function createGroup(name, recieptIds) {
  return {
    type: 'ADD_GROUP',
    payload: {
      name,
      recieptIds,
    },
  };
}

export function addToGroup(name, newId) {
  return {
    type: 'ADD_TO_GROUP',
    payload: {
      name,
      newId,
    },
  };
}

export function createTag(name, type) {
  return {
    type: 'ADD_TAG',
    payload: {
      name,
      type,
    },
  };
}

export function addTagInstance(tagName, recieptId, value) {
  return {
    type: 'ADD_TAG_INSTANCE',
    payload: {
      tagName,
      recieptId,
      value,
    },
  };
}

export function createReciept(name, text, pictureURI, groups, tags) {
  return {
    type: 'ADD_RECIEPT',
    payload: {
      name,
      text,
      pictureURI,
      groups,
      tags,
    },
  };
}

export function removeReciept(id) {
  return {
    type: 'REMOVE_RECIEPT',
    payload: {
      id,
    },
  };
}

export function removeRecieptFromGroups(id) {
  return {
    type: 'REMOVE_RECIEPT_FROM_GROUPS',
    payload: {
      id,
    },
  };
}

export function removeGroupFromReciept(id, groupName) {
  return {
    type: 'REMOVE_GROUP_FROM_RECIEPT',
    payload: {
      id,
      groupName,
    },
  };
}

export function removeFromGroup(id, groupName) {
  return {
    type: 'REMOVE_FROM_GROUP',
    payload: {
      id,
      groupName,
    },
  };
}

export function removeRecieptFromTags(id) {
  return {
    type: 'REMOVE_RECIEPT_FROM_TAGS',
    payload: {
      id,
    },
  };
}

export function removeGroup(groupName) {
  return {
    type: 'REMOVE_GROUP',
    payload: {
      groupName,
    },
  };
}

export function increaseID(name) {
  return {
    type: 'INC_ID',
  };
}

