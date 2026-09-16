export interface IMovie {
    title: string;
    description: string;
    banner: {
        url: string;
        publicId: string;
    };
    genre: string[];
    language: string;
    releaseDate: Date;
    duration: number;
    rating: number;
    director: string;
    cast: string[];
    trailerUrl: string;
    createdBy: string;
}