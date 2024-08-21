import { SearchBoxEntity, SearchBoxViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { SearchClient } from './search-client';

export const SearchBox = (props: SearchBoxViewProps<SearchBoxEntity>) => <SearchClient {...props} />;
