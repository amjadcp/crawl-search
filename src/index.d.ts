// src/index.d.ts
import { ComponentType, CSSProperties, ReactNode } from 'react';

export interface SearchComponentProps {
  index: Array<{
    id: string | number;
    content: string;
    url: string;
  }>;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  resultsContainerClassName?: string;
  resultsContainerStyle?: CSSProperties;
  resultItemClassName?: string;
  resultItemStyle?: CSSProperties;
  renderResult?: (item: {
    id: string | number;
    content: string;
    url: string;
  }) => ReactNode;
  placeholder?: string;
}

export const SearchComponent: ComponentType<SearchComponentProps>;
export default SearchComponent;
