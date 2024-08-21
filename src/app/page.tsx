import { Metadata } from 'next';
import Page from './[...slug]/page';

export const metadata: Metadata = {
    title: 'Coriander Lane Corporate',
};

export default async function HomePage({ searchParams }: any) {
    return Page({ params: { slug: [] }, searchParams: searchParams || {} });
}
