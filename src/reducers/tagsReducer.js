const initialTagState = { 
	tagItems: {
        'Total': {
            name: 'Total',
            type: 'Number',
            instances: [],
        },
        'Vendor': {
            name: 'Vendor',
            type: 'Text',
            instances: [],
        },
        'Purchase Date': {
            name: 'Purchase Date',
            type: 'Date',
            instances: [],
        },
        'Returned': {
            name: 'Returned',
            type: 'Boolean',
            instances: [],
        },
    },
};

export default function tags(state = initialTagState, action) {
  switch (action.type) {
    case 'ADD_TAG':
    	let tag = state.tagItems[action.payload.name];
    	return { 
    		...state,
    		tagItems: {
    			...state.tagItems,
    			[action.payload.name]: {
    				name: action.payload.name,
                    type: action.payload.type,
				    instances: [],
				},
    		},
    	};
    case 'ADD_TAG_INSTANCE':
        let getTag = state.tagItems[action.payload.tagName];
        let newInstance = {recieptId: action.payload.recieptId, value: action.payload.value};
        return {
            ...state,
            tagItems: {
                ...state.tagItems,
                [action.payload.tagName]: {
                    name: getTag.name,
                    type: getTag.type,
                    instances: [...getTag.instances, newInstance],
                },
            },
        };
    case 'REMOVE_RECIEPT_FROM_TAGS':
        let keys = Object.keys(state.tagItems);
        let tagItems = {};
        let newTagItems = keys.map(name => {
            let newTagItem = Object.assign(state.tagItems[name]);
            let newInstances = state.tagItems[name].instances.filter(instance => (instance.recieptId !== action.payload.id));
            newTagItem.name = state.tagItems[name].name;
            newTagItem.type = state.tagItems[name].type;
            newTagItem.instances = newInstances;
            tagItems[newTagItem.name] = newTagItem;
        });
        return {
            ...state,
            tagItems: tagItems,
        };
    default:
      return state;
  }
}