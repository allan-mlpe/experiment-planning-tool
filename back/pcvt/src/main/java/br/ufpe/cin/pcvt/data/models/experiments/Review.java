package br.ufpe.cin.pcvt.data.models.experiments;

import br.ufpe.cin.pcvt.converters.EReviewStateConverter;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = TableName.REVIEW)
public class Review implements Comparable<Review> {

	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "review_sequence", sequenceName = "review_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_sequence")
	private Integer id;
	@ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name = "reviewed_plan")
	private Plan plan;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "reviewer")
	private User reviewer;
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = TableName.REVIEW_ITEM, joinColumns = @JoinColumn(name = "id_review"))
	private List<ReviewItem> reviewItems;
	@Column(name = "state")
	@Convert(converter = EReviewStateConverter.class)
	private EReviewState state;

	private static final int PLAN_SIZE = 31;

	public Review() {
		this.state = EReviewState.ReviewRequested;
		MakeReviewable();
	}

	private void MakeReviewable() {
		if (reviewItems == null) {
			reviewItems = new ArrayList<ReviewItem>();
			for (int i = 0; i < PLAN_SIZE; i++) {
				reviewItems.add(new ReviewItem(i + 1));
			}
		}
	}
	
	public Integer getProgress() {
		int progress = 0;

		if (reviewItems != null) {
			double total = reviewItems.size();
			double reviewed = 0;

			for (ReviewItem item : reviewItems) {
				if (item.getScore() != null) {
					reviewed++;
				}
			}
			progress = (int) ((reviewed / total) * 100);
		}

		return progress;
	}

	public Double getTotalScore() {
		double total = 0;

		if (reviewItems != null) {
			for (ReviewItem item : reviewItems) {
				if (item.getScore() != null && item.getScore().scoreValue >= 0) {
					total += item.getScore().scoreValue;
				}
			}
		}

		return total;
	}

	public Integer getMaxScore() {
		int total = 0;

		if (reviewItems != null) {
			for (ReviewItem item : reviewItems) {
				if (item.getScore() == null || item.getScore().scoreValue >= 0) {
					total++;
				}
			}
		}

		return total;
	}

	public String getScoreString() {
		return String.format("%.2f%%", ((getTotalScore() / getMaxScore()) * 100));
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Plan getPlan() {
		return plan;
	}

	public void setPlan(Plan plan) {
		this.plan = plan;
	}

	public User getReviewer() {
		return reviewer;
	}

	public void setReviewer(User reviewer) {
		this.reviewer = reviewer;
	}

	public List<ReviewItem> getReviewItems() {
		return reviewItems;
	}

	public void setReviewItems(List<ReviewItem> reviewItems) {
		this.reviewItems = reviewItems;
	}

	public EReviewState getState() {

		if (state.isExpirable() && plan.dateExpired() )
			return EReviewState.Expired;
		
		return this.state;
	}
	
	public void setState(EReviewState state) {
		this.state = state;
	}
	
	public boolean isAwaitingResponse() {
		return getState() == EReviewState.ReviewRequested;
	}

	public boolean isReviewable() {
		return getState() == EReviewState.Reviewing;
	}

	@Override
	public int compareTo(Review o) {
		return this.id - o.id;
	}

}
