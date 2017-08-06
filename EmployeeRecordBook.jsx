import React from 'react';
import styles from "./style.css";
class EmployeeRecordBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeRecords: [],
            selectedIndex: 0,
            updateButtonVisible : false,
            cancelButtonVisible : false
        };
        this.addEmployeeRecord = this.addEmployeeRecord.bind(this);
        this.editEmployeeRecord = this.editEmployeeRecord.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.setEmployeeDataToEdit = this.setEmployeeDataToEdit.bind(this);
        this.deleteEmployeeRecord = this.deleteEmployeeRecord.bind(this);
    }
    addEmployeeRecord(formData) {
        let l_empRecords = this.state.employeeRecords;
        l_empRecords.push(formData);
        this.setState({ employeeRecords: l_empRecords });

        document.getElementById("empName").value = "";
        document.getElementById("empDept").value = "HR";
        document.getElementById("empDesg").value = "";
        document.getElementById("empHobby").value = "";
        //setEmpDataToForm(null);
    }
    editEmployeeRecord(formData) {
        const l_empRecords = Array.from(this.state.employeeRecords);
        l_empRecords[this.state.selectedIndex] = formData;
        this.setState({ employeeRecords : l_empRecords });
        document.getElementById("empName").value = "";
        document.getElementById("empDept").value = "HR";
        document.getElementById("empDesg").value = "";
        document.getElementById("empHobby").value = "";
        //setEmpDataToForm(null);
    }
    deleteEmployeeRecord(index) {
        const l_empRecords = Array.from(this.state.employeeRecords);
        l_empRecords.splice(index,1);
        this.setState({ employeeRecords : l_empRecords });
        document.getElementById("empName").value = "";
        document.getElementById("empDept").value = "HR";
        document.getElementById("empDesg").value = "";
        document.getElementById("empHobby").value = "";
        //setEmpDataToForm(null);
    }
    setEmployeeDataToEdit(index) {
        // setEmpDataToForm(this.state.employeeRecords[index]);
        let l_empData=this.state.employeeRecords[index];
        document.getElementById("empName").value = l_empData.empName;
        document.getElementById("empDept").value = l_empData.empDept;
        document.getElementById("empDesg").value = l_empData.empDesg;
        document.getElementById("empHobby").value = l_empData.empHobby;
        this.setState({updateButtonVisible : true,cancelButtonVisible:true,
        selectedIndex:index});
    }
    cancelEdit()
    {
        document.getElementById("empName").value = "";
        document.getElementById("empDept").value = "HR";
        document.getElementById("empDesg").value = "";
        document.getElementById("empHobby").value = "";
        this.setState({updateButtonVisible : false,cancelButtonVisible:false,
        selectedIndex:0});
    }
    render() {
        return (
            <div>
                <EmployeeRecord addEmpployee={this.addEmployeeRecord} editEmployee={this.editEmployeeRecord}
                cancelEdit={this.cancelEdit}
                updateButton = {this.state.updateButtonVisible}
                        cancelButton = {this.state.cancelButtonVisible} />
                <div className={styles.tableMain}>
                    <div className={styles.titleBar}>
                        <p>Employee Record Book</p>
                    </div>
                    <div className={styles.Heading}>
                        <div className={styles.Cell}>Name</div>
                        <div className={styles.Cell}>Department</div>
                        <div className={styles.Cell}>Designation</div>
                        <div className={styles.Cell}>Hobby</div>
                    </div>
                    <EmployeeData localEmployeeRecords={this.state.employeeRecords}
                        localSetEmployeeDataToEdit={this.setEmployeeDataToEdit} localDeleteEmployeeData={this.deleteEmployeeRecord}
                        />
                </div>
            </div>
        );
    }
}

class EmployeeRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empName: "",
            empDept: "",
            empDesg: "",
            empHobby: ""
        };
        this.localAddEmployeeRecord = this.localAddEmployeeRecord.bind(this);
        this.localEditEmployeeRecord = this.localEditEmployeeRecord.bind(this);
        this.localCancelEdit = this.localCancelEdit.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    localAddEmployeeRecord(e) {
        this.props.addEmpployee(this.state);
    }
    localEditEmployeeRecord(e) {
        console.log(this.state);
        this.props.editEmployee(this.state);
    }
    localCancelEdit(e)
    {    
        this.props.cancelEdit();
    }
    updateState(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    render() {        
        return (
            <div>
                Name : <input type="text" placeholder="Employee Name" id="empName" onChange={this.updateState} /><br />
                Department : <select id="empDept" onChange={this.updateState}> <option value="HR">HR</option>
                    <option value="PRD">PRD</option>
                    <option value="IMPL">IMPL</option>
                    <option value="UI">UI</option>
                    <option value="MI">MI</option>
                    <option value="QA">QA</option>
                </select><br />
                Designation: <input type="text" placeholder="Employee Designation" id="empDesg" onChange={this.updateState} /><br />
                Hobby : <textarea id="empHobby" rows="5" cols="25" placeholder="Hobby" onChange={this.updateState}></textarea><br />
                {this.props.updateButton?
                <button name="Update Employee" onClick={this.localEditEmployeeRecord}>Update Employee</button>:
                <button name="Add Employee" onClick={this.localAddEmployeeRecord}>Add Employee</button>}
                {this.props.cancelButton ?
                <button name="Cancel" onClick={this.localCancelEdit}>Cancel</button>:
                ""}
                
            </div>
        );
    }
}

class EmployeeData extends React.Component {
    constructor(props) {
        super(props);
        this.localSetEmployeeDataToEdit = this.localSetEmployeeDataToEdit.bind(this);
        this.localDeleteEmployeeData = this.localDeleteEmployeeData.bind(this);
    }
    localSetEmployeeDataToEdit(e) {
        this.props.localSetEmployeeDataToEdit(e.target.name);
    }
    localDeleteEmployeeData(e){
        this.props.localDeleteEmployeeData(e.target.name);
    }

    render() {
        let empInfo;

        if (this.props.localEmployeeRecords) {
            empInfo = this.props.localEmployeeRecords.map((emp, i) => {
                return (
                    <div className={styles.Row} key={i}>
                        <div className={styles.Cell}>{emp.empName}</div>
                        <div className={styles.Cell}>{emp.empDept}</div>
                        <div className={styles.Cell}>{emp.empDesg}</div>
                        <div className={styles.Cell}>{emp.empHobby}</div>
                        {/* <div><input type="hidden" id={emp.empName+i}/></div> */}
                        <div><button onClick={this.localSetEmployeeDataToEdit} name={i}>Edit</button></div>
                        <div><button onClick={this.localDeleteEmployeeData} name={i}>Delete</button></div>
                    </div>);
            });
        }
        return (<div>{empInfo}</div>);
    }
}

export default EmployeeRecordBook;