import { IRatingMark, TRatingMarkRequest } from '@/types/rating-mark.types';

import { axiosWithAuth } from '@/api/interceptors';

class RatingMarkService {
  private BASE_URL = '/rating-mark';

  async createRatingMark(newRatingMarkData: TRatingMarkRequest) {
    const { data } = await axiosWithAuth.post<IRatingMark>(
      this.BASE_URL,
      newRatingMarkData,
    );

    return data;
  }

  async updateRatingMark(newData: TRatingMarkRequest, ratingMarkId: string) {
    const { data } = await axiosWithAuth.patch<IRatingMark>(
      `${this.BASE_URL}/${ratingMarkId}`,
      newData,
    );

    return data;
  }

  async deleteRatingMark(ratingMarkId: string) {
    const { data } = await axiosWithAuth.delete<boolean>(
      `${this.BASE_URL}/${ratingMarkId}`,
    );

    return data;
  }
}

export const ratingMarkService = new RatingMarkService();
