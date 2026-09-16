export interface Movie {
  _id: string;

  title: string;

  description: string;

  banner: {
    url: string;
    publicId: string;
  };

  genre: string[];

  language: string;

  releaseDate: string;

  duration: number;

  rating: number;

  director: string;

  cast: string[];

  trailerUrl: string;

  createdBy: string;

  createdAt: string;

  updatedAt: string;
}