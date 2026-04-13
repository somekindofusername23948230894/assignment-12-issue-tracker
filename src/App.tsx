import React from "react";
// Define Issue type
type Issue = {
id: number;
status: string;
owner: string;
created: Date;
effort: number;
completionDate?: Date;
title: string;
priority: string;
};
// --------------------
// Helper Function
// --------------------
function formatDate(date: Date): string {
return date.toLocaleDateString("en-US", {
month: "short",
day: "numeric",
year: "numeric",
});
}
const borderedStyle: React.CSSProperties = {
border: "1px solid silver",
padding: 6,
};
// --------------------
// IssueRow
// --------------------
class IssueRow extends React.Component<{
issue: Issue;
deleteIssue: (id: number) => void;
}> {
render() {
const { issue } = this.props;
return (
<tr>
<td style={borderedStyle}>{issue.id}</td>
<td style={borderedStyle}>{issue.status}</td>
<td style={borderedStyle}>{issue.owner}</td>
<td style={borderedStyle}>{formatDate(issue.created)}</td>
<td style={borderedStyle}>{issue.effort}</td>
<td style={borderedStyle}>
{issue.completionDate ? formatDate(issue.completionDate) : ""}
</td>
<td style={borderedStyle}>{issue.title}</td>
<td style={borderedStyle}>{issue.priority}</td>
{/* Actions Column */}
<td style={borderedStyle}>
<button onClick={() => this.props.deleteIssue(issue.id)}>
Delete
</button>
</td>
</tr>
);
}
}
// --------------------
// IssueTable
// --------------------
class IssueTable extends React.Component<{
issues: Issue[];
deleteIssue: (id: number) => void;
}> {
render() {
const issueRows = this.props.issues.map((issue) => (
<IssueRow
key={issue.id}
issue={issue}
deleteIssue={this.props.deleteIssue}
/>
));
return (
<table style={{ borderCollapse: "collapse", width: "100%" }}>
<thead>
<tr>
<th style={borderedStyle}>Id</th>
<th style={borderedStyle}>Status</th>
<th style={borderedStyle}>Owner</th>
<th style={borderedStyle}>Created</th>
<th style={borderedStyle}>Effort</th>
<th style={borderedStyle}>Completion Date</th>
<th style={borderedStyle}>Title</th>
<th style={borderedStyle}>Priority</th>
<th style={borderedStyle}>Actions</th>
</tr>
</thead>
<tbody>{issueRows}</tbody>
</table>
);
}
}
// --------------------
// IssueFilter
// --------------------
class IssueFilter extends React.Component {
render() {
return <div></div>;
}
}
// --------------------
// IssueAdd
// --------------------
type IssueAddProps = {
addIssue: (issue: Issue) => void;
};
type IssueAddState = {
owner: string;
title: string;
effort: string;
completionDate: string;
priority: string;
};
class IssueAdd extends React.Component<IssueAddProps, IssueAddState> {
constructor(props: IssueAddProps) {
super(props);
this.state = {
owner: "",
title: "",
effort: "",
completionDate: "",
priority: "Low",
};
}
handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
this.setState({ [name]: value } as Pick<
IssueAddState,
keyof IssueAddState
>);
};
// Task 6
validateForm = (): boolean => {
  const { owner, title, effort } = this.state;
  if (!owner || owner.trim().length < 3) {
    alert("Owner must be at least 3 characters");
    return false;
  }
  if (!title || title.trim().length < 5) {
    alert("Title must be at least 5 characters");
    return false;
  }
  const effortNum = Number(effort);
  if (!effort || isNaN(effortNum) || effortNum <= 0) {
    alert("Effort must be a positive number");
    return false;
  }
  return true;
};
handleSubmit = (e: React.FormEvent) => {
  // Task 3: Part 2 and Task 6
  e.preventDefault();

  // Validate before submitting
  if (!this.validateForm()) {
    return; // Don't add the issue if validation fails
  }

  const newIssue: Issue = {
    id: 0,
    status: "Open",
    owner: this.state.owner,
    created: new Date(),
    effort: Number(this.state.effort),
    completionDate: this.state.completionDate
      ? new Date(this.state.completionDate)
      : undefined,
    title: this.state.title,
    priority: this.state.priority,
  };
  this.props.addIssue(newIssue);

  // Clear the form after submission
  this.setState({
    owner: "",
    title: "",
    effort: "",
    completionDate: "",
    priority: "Low",
  });
};
render() { // Task 3: Part 1 and 3 and Task 6
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "20px auto",
  };
  const inputStyle: React.CSSProperties = {
    padding: "8px 12px",
    margin: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    width: "200px",
  };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    margin: "10px 5px 5px 0",
    backgroundColor: "grey",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };
  return (
    <div style={containerStyle}>
        <form onSubmit={this.handleSubmit}>
          <input name="owner" placeholder="Owner" value={this.state.owner} onChange={this.handleChange} style={inputStyle} />
          <input name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} style={inputStyle} />
          <input name="effort" placeholder="Effort" type="number" value={this.state.effort} onChange={this.handleChange} style={inputStyle} />
          <input name="completionDate" type="date" value={this.state.completionDate} onChange={this.handleChange} style={inputStyle} />
          <select name="priority" value={this.state.priority} onChange={this.handleChange} style={inputStyle}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit" style={buttonStyle}>Add Issue</button>
        </form>
      </div>
  );
}
}
// --------------------
// IssueList
// --------------------
type IssueListState = {
issues: Issue[];
};
class IssueList extends React.Component<{}, IssueListState> {
constructor(props: {}) {
super(props);
this.state = {
issues: [
{
id: 1,
status: "Open",
owner: "John",
created: new Date("2016-08-15"),
effort: 5,
completionDate: undefined,
title: "Error in console when clicking Add",
priority: "High",
},
{
id: 2,
status: "Assigned",
owner: "Emma",
created: new Date("2016-08-16"),
effort: 14,
completionDate: new Date("2016-08-30"),
title: "Missing bottom border on panel",
priority: "Low",
},
],
};
}
addIssue = (issue: Issue) => {
  // Tasks 1 and 4
  // Generate a new id by finding the max id and adding 1
  const newId = Math.max(...this.state.issues.map(i => i.id)) + 1;
  
  // Create a copy of the issue with the new id using spread operator
  const updatedIssue = { ...issue, id: newId };

  // Console log
  console.log("addIssue - BEFORE setState:", this.state.issues);
  
  // Update state with a new array (never mutate existing array)
  this.setState((prevState) => ({ 
    issues: [...prevState.issues, updatedIssue] 
  }));

  // Console log
  console.log("addIssue - AFTER setState:", this.state.issues);
};
deleteIssue = (id: number) => {
  // Tasks 2 and 4
  // Console log
  console.log("deleteIssue - BEFORE setState:", this.state.issues);

  this.setState((prevState) => ({
    issues: prevState.issues.filter((issue) => issue.id !== id)
  }));

  // Console log
  console.log("deleteIssue - AFTER setState:", this.state.issues);
};
render() {
return (
<React.Fragment>
<h1>Issue Tracker</h1>
<IssueFilter />
<hr />
<p>Total Issues: {this.state.issues.length}</p>
<IssueTable
issues={this.state.issues}
deleteIssue={this.deleteIssue}
/>
<hr />
<IssueAdd addIssue={this.addIssue} />
</React.Fragment>
);
}
}
export default IssueList;
