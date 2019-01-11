package br.ufpe.cin.pcvt.data.models.experiments;

import br.ufpe.cin.pcvt.converters.EPlanStateConverter;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.constants.TableName;
import br.ufpe.cin.pcvt.exceptions.entities.experiments.plan.PlanAlreadyHasChildException;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.time.Instant;
import java.util.*;

@Entity
@Table(name = TableName.PLAN)
public class Plan implements Comparable<Plan> {

	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "plan_sequence", sequenceName = "plan_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "plan_sequence")
	private Integer id;
	@Column(name = "name", length = 1024)
	private String name;
	@Column(columnDefinition = "TEXT", name = "description")
	private String description;
	@Column(name = "version")
	private Integer version;
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "author")
	private User author;
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "parent_plan")
	private Plan parentPlan;
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "child_plan")
	private Plan childPlan;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = TableName.PLAN_HAS_COLLABORATOR)
	@OrderBy("name ASC")
	private SortedSet<User> collaborators;
	@Column(name = "date")
	private Date date;
	@Column(name = "privacy")
	@Enumerated(EnumType.ORDINAL)
	private EPrivacy privacySetting;
	@Column(name = "state")
	@Convert(converter = EPlanStateConverter.class)
	private EPlanState state;
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = TableName.PLAN_ITEM, joinColumns = @JoinColumn(name = "id_plan"))
	@OrderBy("id ASC")
	private SortedSet<PlanItem> planItems;
	@OneToMany(mappedBy = "plan", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Review> reviews;
	@Column(name = "archived")
	private boolean archived;
	@Column(name = "custom_plan")
	private boolean customPlan;
	@Column(name = "file")
	private byte[] file;
	@Column(name = "filename")
	private String filename;
	@Lob
	@Column(name = "plandetails", columnDefinition="TEXT")
	private String details;
	@Lob
	@Column(name = "plan_characteristics")
	private String characteristics;
	@Lob
	@Column(name = "plan_threats")
	private String threats;
	@Lob
	@Column(name = "plan_actions")
	private String actions;
	@Lob
	@Column(name = "plan_generated_threats")
	private String actionRelatedThreats;
	@Lob
	@Column(name = "custom_threats")
	private String customThreats;

	private static final int PLAN_SIZE = 31;

	public Plan() {
		this.collaborators = new TreeSet<User>();
		this.version = 1;
		this.state = EPlanState.Planning;
		MakeCreatable();
	}

	public Plan(Integer id, String name, String description, SortedSet<User> authors, Date date, EPrivacy privacySetting,
				List<ReviewItem> reviewItems) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.collaborators = authors;
		this.date = date;
		this.privacySetting = privacySetting;
	}

	private void MakeCreatable() {

		if (planItems == null) {
			planItems = new TreeSet<PlanItem>();
			for (int i = 0; i < PLAN_SIZE; i++) {
				planItems.add(new PlanItem(i + 1));
			}
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public Plan getParentPlan() {
		return parentPlan;
	}

	public void setParentPlan(Plan parentPlan) {
		this.parentPlan = parentPlan;
	}

	public Plan getChildPlan() {
		return childPlan;
	}

	public void setChildPlan(Plan childPlan) {
		this.childPlan = childPlan;
	}

	public SortedSet<User> getCollaborators() {
		return collaborators;
	}

	public void setCollaborators(SortedSet<User> collaborators) {
		this.collaborators = collaborators;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public EPrivacy getPrivacySetting() {
		return privacySetting;
	}

	public void setPrivacySetting(EPrivacy privacySetting) {
		this.privacySetting = privacySetting;
	}

	public EPlanState getState() {

		if (dateExpired() && this.state.isExpirable())
			this.state = EPlanState.Expired;

		return state;
	}

	public void setState(EPlanState state) {
		this.state = state;
	}

	public SortedSet<PlanItem> getPlanItems() {
		return planItems;
	}

	public void setPlanItems(SortedSet<PlanItem> planItems) {
		this.planItems = planItems;
	}

	@JsonIgnore
	@XmlTransient
	public List<Review> getReviews() {
		if (reviews == null)
			reviews = new ArrayList<Review>();
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}

	public boolean isArchived() {
		return archived;
	}

	public void setArchived(boolean archived) {
		this.archived = archived;
	}

	public boolean isCustomPlan() {
		return customPlan;
	}

	public void setCustomPlan(boolean customPlan) {
		this.customPlan = customPlan;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public boolean dateExpired() {
		Date now = Date.from(Instant.now());

		if (date != null)
			return now.after(date);
		else
			return false;
	}

	public boolean hasChild() {
		return this.childPlan != null;
	}

	public boolean hasParent() {
		return this.parentPlan != null;
	}

	public boolean isEditable() {
		return this.state == EPlanState.Planning;
	}

	public boolean isReportable() {
		return this.state.isReportable();
	}

	public boolean isCopyable() {
		return this.state.isCopyable() && !hasChild() && !isCustomPlan();
	}

	public boolean isArchivable() {
		return this.state.isArchivable();
	}

	public boolean isDeletable() {
		return this.state.isDeletable();
	}

	@Override
	public String toString() {
		return "Plan [id=" + id + ", name=" + name + ", description=" + description
				// + ", authors=" + authors != null ? authors.size()+"" : 0
				// + ", reviewers=" + reviewers != null ? reviewers.size()+"" : 0
				+ ", date=" + date + ", privacySetting=" + privacySetting + "]";
	}

	public String getAuthorsNames() {
		String names = String.format("%s; ", author.getName());

		for (User user : collaborators) {
			names = String.format("%s%s; ", names, user.getName());
		}

		return names;
	}

	@Override
	public int compareTo(Plan o) {

		int comp = this.name.compareTo(o.name);

		if (comp == 0) {
			comp = this.version - o.version;
		}

		if (comp == 0 && this.id != null && o.id != null) {
			comp = this.id - o.id;
		}

		return comp;
	}

	public Plan createChild() throws PlanAlreadyHasChildException {

		if (this.childPlan != null)
			throw new PlanAlreadyHasChildException(this);

		Plan child = new Plan();

		child.name = this.name;
		child.description = this.description;
		child.details = this.details;
		child.version = this.version + 1;
		child.date = this.date;
		child.privacySetting = this.privacySetting;
		child.customPlan = this.customPlan;
		child.file = this.file;
		child.filename = this.filename;

		child.author = this.author;

//		child.characteristics = this.characteristics;
//		child.threats = this.threats;
//		child.actions = this.actions;
//		child.actionRelatedThreats = this.actionRelatedThreats;

		for (User user : this.collaborators) {
			child.collaborators.add(user);
		}

		if (planItems != null) {
			child.planItems = new TreeSet<PlanItem>();
			for (PlanItem item : this.planItems) {
				child.planItems.add(item);
			}
		}

		child.parentPlan = this;
		this.childPlan = child;

		return child;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getCharacteristics() {
		return characteristics;
	}

	public void setCharacteristics(String characteristics) {
		this.characteristics = characteristics;
	}

	public String getThreats() {
		return threats;
	}

	public void setThreats(String threats) {
		this.threats = threats;
	}

	public String getActions() {
		return actions;
	}

	public void setActions(String actions) {
		this.actions = actions;
	}

	public String getActionRelatedThreats() { return actionRelatedThreats; }

	public void setActionRelatedThreats(String actionRelatedThreats) { this.actionRelatedThreats = actionRelatedThreats; }

	public String getCustomThreats() {
		return customThreats;
	}

	public void setCustomThreats(String customThreats) {
		this.customThreats = customThreats;
	}
}
