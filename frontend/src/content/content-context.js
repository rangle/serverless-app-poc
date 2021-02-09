import { createContext, useReducer } from 'react';

const ContentContext = createContext();

const initialState = {
  products: [],
  selectedProducts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'SELECT_PRODUCT':
      return {
        ...state,
        selectedProducts: state.selectedProducts.concat(action.payload),
      };
    default:
      return state;
  }
};

const ContentProvider = (props) => {
  const [contentState, dispatch] = useReducer(reducer, initialState);
  const value = { contentState, dispatch };
  return (
    <ContentContext.Provider value={value}>
      {props.children}
    </ContentContext.Provider>
  );
};

export { ContentProvider, ContentContext };
