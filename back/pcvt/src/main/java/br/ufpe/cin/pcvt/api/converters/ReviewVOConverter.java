package br.ufpe.cin.pcvt.api.converters;

import br.ufpe.cin.pcvt.api.models.ReviewVO;
import br.ufpe.cin.pcvt.data.models.experiments.Review;

public class ReviewVOConverter implements IVOConverter<Review, ReviewVO> {

    private static ReviewVOConverter instance;

    private UserVOConverter userVOConverter = UserVOConverter.getInstance();
    private ExperimentalPlanVOConverter planVOConverter = ExperimentalPlanVOConverter.getInstance();

    public static ReviewVOConverter getInstance() {
        if(instance == null)
            instance = new ReviewVOConverter();
        return instance;
    }

    private ReviewVOConverter() {}

    @Override
    public ReviewVO convertToVO(Review review) {
        ReviewVO reviewVO = new ReviewVO();

        reviewVO.setId(review.getId());
        reviewVO.setPlan(planVOConverter.convertToVO(review.getPlan()));
        reviewVO.setUser(userVOConverter.convertToVO(review.getReviewer()));
        reviewVO.setReviewItems(review.getReviewItems());
        reviewVO.setState(review.getState());

        return reviewVO;
    }

    @Override
    public Review convertFromVO(ReviewVO reviewVO) {
        return null;
    }
}
