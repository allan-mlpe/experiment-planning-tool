package br.ufpe.cin.pcvt.api.models;

import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;
import br.ufpe.cin.pcvt.data.models.experiments.ReviewItem;

import java.util.List;

public class ReviewVO {

    private Integer id;
    private ExperimentalPlanVO plan;
    private UserVO user;
    private List<ReviewItem> reviewItems;
    private EReviewState state;

    public ReviewVO() { }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ExperimentalPlanVO getPlan() {
        return plan;
    }

    public void setPlan(ExperimentalPlanVO plan) {
        this.plan = plan;
    }

    public UserVO getUser() {
        return user;
    }

    public void setUser(UserVO user) {
        this.user = user;
    }

    public List<ReviewItem> getReviewItems() {
        return reviewItems;
    }

    public void setReviewItems(List<ReviewItem> reviewItems) {
        this.reviewItems = reviewItems;
    }

    public EReviewState getState() {
        return state;
    }

    public void setState(EReviewState state) {
        this.state = state;
    }
}
