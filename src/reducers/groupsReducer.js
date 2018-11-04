const initialGroupState = { 
	groupItems: {
		'First Group': {
			name: 'First Group',
		    recieptIds: [0],
		},
	},
};

export default function groups(state = initialGroupState, action) {
  switch (action.type) {
    case 'ADD_GROUP':
    	let group = state.groupItems[action.payload.name];
    	return { 
    		...state,
    		groupItems: {
    			...state.groupItems,
    			[action.payload.name]: {
    				name: action.payload.name,
				    recieptIds: action.payload.recieptIds,
				},
    		},
    	};
    case 'ADD_TO_GROUP':
        let getGroup = state.groupItems[action.payload.name];
        return {
            ...state,
            groupItems: {
                ...state.groupItems,
                [action.payload.name]: {
                    name: getGroup.name,
                    recieptIds: getGroup.recieptIds.concat(action.payload.newId),
                },
            },
        };
    case 'REMOVE_FROM_GROUP':
        getGroup = state.groupItems[action.payload.groupName];
        return {
            ...state,
            groupItems: {
                ...state.groupItems,
                [action.payload.groupName]: {
                    name: getGroup.name,
                    recieptIds: getGroup.recieptIds.filter(id => (id !== action.payload.id)),
                },
            },
        };
    case 'REMOVE_GROUP':
        groups = state.groupItems;
        let newKeys = Object.keys(groups).filter(key => (key !== action.payload.groupName));
        let newGroupItems = {};
        newKeys.map((key) => {
            newGroupItems[key] = groups[key];
        });
        return {
            ...state,
            groupItems: newGroupItems, 
        };



    case 'REMOVE_RECIEPT_FROM_GROUPS':
        let keys = Object.keys(state.groupItems);
        let groupItems = {};
        newGroupItems = keys.map(name => {
            let newGroupItem = Object.assign(state.groupItems[name]);
            let newRecieptIds = state.groupItems[name].recieptIds.filter(id => (id !== action.payload.id));
            newGroupItem.name = state.groupItems[name].name;
            newGroupItem.recieptIds = newRecieptIds;
            groupItems[newGroupItem.name] = newGroupItem;
        });
        return {
            ...state,
            groupItems: groupItems,
        };
    default:
      return state;
  }
}