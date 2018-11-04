
const initialRecieptState = { 
	id: 1,
	recieptItems: [{ 
		id: 0,
		name: "First Reciept",
		text:
		"\
Status: Completed\n\
Ref ID: 1174631\n\
Username: Me\n\
Email: mygmail@gmail.com\n\
Total Items: 20\n\
Total: 20.61 USD\n\
Payment: PayPal, USD\n\
Created: 10/12 20:03\
		",
		pictureURI: null,
		groups: [],
		tags: [],
	}],
};

export default function reciepts(state = initialRecieptState, action) {
	switch (action.type) {
		case 'ADD_RECIEPT':
			let reciept = {
				id: state.id, 
				name: action.payload.name, 
				text: action.payload.text,
				pictureURI: action.payload.pictureURI,
				groups: action.payload.groups,
				tags: action.payload.tags,
			};
			return {
				...state,
				id: state.id+1,
        		recieptItems: [...state.recieptItems, reciept],
			};
		case 'REMOVE_RECIEPT':
			return {
				...state,
				id: state.id,
				recieptItems: state.recieptItems.filter(reciept => 
					(reciept.id !== action.payload.id)),
			};
		case 'REMOVE_GROUP_FROM_RECIEPT':
			let recieptTemp = state.recieptItems.find(function(reciept) {
		        return action.payload.id === reciept.id;
		    });
		    let newGroups = recieptTemp.groups.filter(
		    	groupName => groupName !== action.payload.groupName);
			return {
				...state,
				id: state.id,
				recieptItems: state.recieptItems.map(
					(reciept) => reciept.id === action.payload.id ? 
					{ ...reciept, groups: newGroups } : reciept),
			};
		default:
			return state;
	}
}
