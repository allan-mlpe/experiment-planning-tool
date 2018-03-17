package br.ufpe.cin.pcvt.data.models.experiments;

import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;

@Embeddable
@Table(name = TableName.REVIEW_ITEM)
public class ReviewItem {

	// Review attributes
	@Column(name = "id")
	private Integer id;
	@Column(name = "score")
	private EScore score;
	@Column(columnDefinition="TEXT", name = "comments")
	private String comments;
	
	public ReviewItem(){
		
	}
	
	public ReviewItem(Integer id){
		this.id = id;
		this.comments = "";
	}
	
	@Override
	public String toString()
	{
		return "ReviewItem["+id+", "+score.scoreValue+"]";
	}
	
	public EScore getScore() {
		return score;
	}

	public void setScore(EScore score) {
		this.score = score;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
