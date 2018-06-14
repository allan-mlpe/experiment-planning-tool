package br.ufpe.cin.pcvt.api.models;

import java.util.Date;
import java.util.List;

public class ReviewWrapper {

    ExperimentalPlanVO plan;
    List<UserVO> reviewers;
    Date date;

    public ReviewWrapper() {
    }

    public ExperimentalPlanVO getPlan() {
        return plan;
    }

    public void setPlan(ExperimentalPlanVO plan) {
        this.plan = plan;
    }

    public List<UserVO> getReviewers() {
        return reviewers;
    }

    public void setReviewers(List<UserVO> reviewers) {
        this.reviewers = reviewers;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
