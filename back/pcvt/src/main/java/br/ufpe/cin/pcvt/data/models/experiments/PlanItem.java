package br.ufpe.cin.pcvt.data.models.experiments;

import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;

@Embeddable
@Table(name = TableName.PLAN_ITEM)
public class PlanItem implements Comparable<PlanItem> {

	// Review attributes
	@Column(name = "id")
	private Integer id;
	@Column(columnDefinition="TEXT", name = "text")
	private String text;

	public PlanItem() {

	}

	public PlanItem(Integer id) {
		this.id = id;
		this.text = "";
	}

	@Override
	public String toString() {
		return "ReviewItem[" + id + ", " + text + "]";
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public int compareTo(PlanItem o) {
		return this.id - o.id;
	}

}
