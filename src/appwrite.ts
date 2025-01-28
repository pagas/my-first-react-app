
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATAbASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

import { Client, Databases, ID, Query } from 'appwrite';
import { Movie, TrendingMovie, } from './types';
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
    console.log(PROJECT_ID, DATAbASE_ID, COLLECTION_ID);

    // 1. Use appwrite SDK to check if the search term exists in the database
    try {
        const response = await database.listDocuments(DATAbASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        if (response.documents.length > 0) {
            // 2. If it does, increment the count
            const document = response.documents[0];
            const count = document.count + 1;
            await database.updateDocument(DATAbASE_ID, COLLECTION_ID, document.$id, {
                count
            });
        } else {
            // 3. If it doesn't, add the search term to the database with a count of 1
            await database.createDocument(DATAbASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movie.id,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    try {
        const response = await database.listDocuments(DATAbASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ]);

        return response.documents.map((doc) => ({
            searchTerm: doc.searchTerm,
            count: doc.count,
            poster_url: doc.poster_url,
            movie_id: doc.movie_id
        })) as TrendingMovie[];
    } catch (error) {
        console.error(error);
        return [];
    }
}