import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import type { Headphone } from "../../slices/headphones/slice";

export const reviewSchema = z.object({
  id: z.string(),
  user: z.string(),
  text: z.string(),
  rating: z.number(),
});

export const reviewsArraySchema = z.array(reviewSchema);

export type Review = z.infer<typeof reviewSchema>;

export interface NewReview {
  user: Review["user"];
  text: Review["text"];
  rating: Review["rating"];
}

export interface EditableReview {
  text?: Review["text"];
  rating?: Review["rating"];
}

interface AddReviewByHeadphoneIdParams {
  headphoneId: Headphone["id"];
  review: NewReview;
}

interface EditReviewByIdParams {
  reviewId: Review["id"];
  review: EditableReview;
  headphoneId: Headphone["id"];
}

export const reviewsApi = createApi({
  reducerPath: "reviews",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  tagTypes: ["Reviews"],

  endpoints: (builder) => ({
    getReviewsByHeadphoneId: builder.query<Review[], Headphone["id"]>({
      query: (headphoneId) => `/reviews?productId=${headphoneId}`,

      providesTags: (_, __, headphoneId) => [
        { type: "Reviews", id: headphoneId },
      ],
    }),

    addReviewByHeadphoneId: builder.mutation<
      Review,
      AddReviewByHeadphoneIdParams
    >({
      query: ({ headphoneId, review }) => ({
        url: `/review/${headphoneId}`,
        method: "POST",
        body: review,
      }),

      invalidatesTags: (_, __, { headphoneId }) => [
        { type: "Reviews", id: headphoneId },
      ],
    }),

    editReviewById: builder.mutation<Review, EditReviewByIdParams>({
      query: ({ reviewId, review }) => ({
        url: `/review/${reviewId}`,
        method: "PATCH",
        body: review,
      }),

      invalidatesTags: (_, __, { headphoneId }) => [
        { type: "Reviews", id: headphoneId },
      ],
    }),
  }),
});

export const {
  useGetReviewsByHeadphoneIdQuery,
  useAddReviewByHeadphoneIdMutation,
  useEditReviewByIdMutation,
} = reviewsApi;
