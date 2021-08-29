var express = require("express"),
  mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment"),
  Joi = require("joi"),
  app = express();
jwt = require("jsonwebtoken");
require('dotenv').config()


//connecting to mongodb
let mongoURI = process.env.DATABASEURL;
//seting up jwt token
let jwtKey = process.env.JWTKEY;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(mongoURI)
  .then(() => console.log("db connection successful"))
  .catch(err => console.log(err));

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
autoIncrement.initialize(conn);
// app.use(bodyParser.urlencoded({ extended: true }));

//for request body
app.use(express.json());
//////////////////////////////////
//////////////////Employee
var employeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  MiddleName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Gender: { type: String, required: true },
  DOB: { type: Date, required: true },
  DateOfJoining: { type: Date, required: true },
  TerminateDate: { type: Date },
  Deleted: { type: Boolean },
  Photo: { type: String },
  ContactNo: { type: String, required: true },
  EmployeeCode: { type: String, required: true },
  Account: { type: Number, required: true },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  position: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
  department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  salary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salary" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
  familyInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyInfo" }],
  workExperience: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WorkExperience" }
  ],
  leaveApplication: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LeaveApplication" }
  ],
  BloodGroup: { type: String },
  EmergencyContactNo: { type: String },
  Hobbies: { type: String },
  PANcardNo: { type: String },
  PermanetAddress: { type: String },
  PresentAddress: { type: String }
});
employeeSchema.plugin(autoIncrement.plugin, {
  model: "Employee",
  field: "EmployeeID"
});

var Employee = mongoose.model("Employee", employeeSchema);

const EmployeeValidation = Joi.object().keys({
  RoleID: Joi.optional(),
  PositionID: Joi.optional(),
  DepartmentID: Joi.optional(),
  SalaryID: Joi.optional(),
  FirstName: Joi.string()
    .max(200)
    .required(),
  MiddleName: Joi.string()
    .max(200)
    .required(),
  LastName: Joi.string()
    .max(200)
    .required(),
  Email: Joi.string()
    .max(200)
    .required(),
  Password: Joi.string()
    .max(100)
    .required(),
  Gender: Joi.string()
    .max(100)
    .required(),
  DOB: Joi.date().required(),
  DateOfJoining: Joi.date().required(),
  TerminateDate: Joi.date().optional(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string()
    .max(20)
    .required(),
  EmployeeCode: Joi.string()
    .max(100)
    .required(),
  Account: Joi.number()
    .max(3)
    .required()
});
const EmployeeValidationUpdate = Joi.object().keys({
  RoleID: Joi.optional(),
  PositionID: Joi.optional(),
  DepartmentID: Joi.optional(),
  SalaryID: Joi.optional(),
  FirstName: Joi.string()
    .max(200)
    .required(),
  MiddleName: Joi.string()
    .max(200)
    .required(),
  LastName: Joi.string()
    .max(200)
    .required(),
  Email: Joi.string()
    .max(200)
    .required(),
  Gender: Joi.string()
    .max(100)
    .required(),
  DOB: Joi.date().required(),
  DateOfJoining: Joi.date().required(),
  TerminateDate: Joi.date().optional(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string()
    .max(20)
    .required(),
  EmployeeCode: Joi.string()
    .max(100)
    .required(),
  Account: Joi.number()
    .max(3)
    .required()
});

const EmployeePersonalInfoValidation = Joi.object().keys({
  BloodGroup: Joi.string()
    .max(10)
    .required(),
  DOB: Joi.date().required(),

  ContactNo: Joi.string()
    .max(20)
    .required(),
  Email: Joi.string()
    .max(200)
    .required(),
  EmergencyContactNo: Joi.string()
    .max(20)
    .required(),
  Gender: Joi.string()
    .max(100)
    .required(),
  Hobbies: Joi.string()
    .max(1000)
    .required(),
  PANcardNo: Joi.string()
    .max(50)
    .required(),
  PermanetAddress: Joi.string()
    .max(200)
    .required(),
  PresentAddress: Joi.string()
    .max(200)
    .required()
});

//Salary
//salary

var salarySchema = new mongoose.Schema({
  BasicSalary: { type: String, required: true },
  BankName: { type: String, required: true },
  AccountNo: { type: String, required: true },
  AccountHolderName: { type: String, required: true },
  IFSCcode: { type: String, required: true },
  TaxDeduction: { type: String, required: true }
});
salarySchema.plugin(autoIncrement.plugin, {
  model: "Salary",
  field: "SalaryID"
});

var Salary = mongoose.model("Salary", salarySchema);

const SalaryValidation = Joi.object().keys({
  BasicSalary: Joi.string()
    .max(20)
    .required(),
  BankName: Joi.string()
    .max(200)
    .required(),
  AccountNo: Joi.string()
    .max(200)
    .required(),
  AccountHolderName: Joi.string()
    .max(200)
    .required(),
  IFSCcode: Joi.string()
    .max(200)
    .required(),
  TaxDeduction: Joi.string()
    .max(100)
    .required()
});

////////////education

var educationSchema = new mongoose.Schema({
  SchoolUniversity: { type: String, required: true },
  Degree: { type: String, required: true },
  Grade: { type: String, required: true },
  PassingOfYear: { type: String, required: true }
});
educationSchema.plugin(autoIncrement.plugin, {
  model: "Education",
  field: "EducationID"
});

var Education = mongoose.model("Education", educationSchema);

const EducationValidation = Joi.object().keys({
  SchoolUniversity: Joi.string()
    .max(200)
    .required(),
  Degree: Joi.string()
    .max(200)
    .required(),
  Grade: Joi.string()
    .max(50)
    .required(),
  PassingOfYear: Joi.string()
    .max(10)
    .required()
});

//////////////////////////////
/////////////////familyInfo
var familyInfoSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Relationship: { type: String, required: true },
  DOB: { type: Date, required: true },
  Occupation: { type: String, required: true }
});
familyInfoSchema.plugin(autoIncrement.plugin, {
  model: "FamilyInfo",
  field: "FamilyInfoID"
});

var FamilyInfo = mongoose.model("FamilyInfo", familyInfoSchema);

const FamilyInfoValidation = Joi.object().keys({
  Name: Joi.string()
    .max(200)
    .required(),
  Relationship: Joi.string()
    .max(200)
    .required(),
  DOB: Joi.date().required(),
  Occupation: Joi.string()
    .max(100)
    .required()
});
/////////////////////
////////////WorkExperience workExperience
var workExperienceSchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Designation: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true }
});
workExperienceSchema.plugin(autoIncrement.plugin, {
  model: "WorkExperience",
  field: "WorkExperienceID"
});

var WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);

const WorkExperienceValidation = Joi.object().keys({
  CompanyName: Joi.string()
    .max(200)
    .required(),
  Designation: Joi.string()
    .max(200)
    .required(),
  FromDate: Joi.date().required(),
  ToDate: Joi.date().required()
});
/////////////////////
////////////LeaveApplication leaveApplication leave-application-emp
var leaveApplicationSchema = new mongoose.Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});
leaveApplicationSchema.plugin(autoIncrement.plugin, {
  model: "LeaveApplication",
  field: "LeaveApplicationID"
});

var LeaveApplication = mongoose.model(
  "LeaveApplication",
  leaveApplicationSchema
);

const LeaveApplicationValidation = Joi.object().keys({
  Leavetype: Joi.string()
    .max(100)
    .required(),

  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
  Reasonforleave: Joi.string()
    .max(100)
    .required(),
  Status: Joi.number()
    .max(1)
    .required()
});
const LeaveApplicationHRValidation = Joi.object().keys({
  Status: Joi.number()
    .max(3)
    .required()
});
//////////////////////////////////
//////////////////Role
var roleSchema = new mongoose.Schema({
  // RoleID: {type:Number,required:true, default: 0 },
  RoleName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
roleSchema.plugin(autoIncrement.plugin, {
  model: "Role",
  field: "RoleID"
});
var Role = mongoose.model("Role", roleSchema);

const RoleValidation = Joi.object().keys({
  RoleName: Joi.string()
    .max(200)
    .required(),
  CompanyID: Joi.required()
});

var positionSchema = new mongoose.Schema({
  PositionName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
positionSchema.plugin(autoIncrement.plugin, {
  model: "Position",
  field: "PositionID"
});

var Position = mongoose.model("Position", positionSchema);

const PositionValidation = Joi.object().keys({
  PositionName: Joi.string()
    .max(200)
    .required(),
  CompanyID: Joi.required()
});

var departmentSchema = new mongoose.Schema({
  DepartmentName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
departmentSchema.plugin(autoIncrement.plugin, {
  model: "Department",
  field: "DepartmentID"
});

var Department = mongoose.model("Department", departmentSchema);

const DepartmentValidation = Joi.object().keys({
  DepartmentName: Joi.string()
    .max(200)
    .required(),
  CompanyID: Joi.required()
});

/////Portal

var portalSchema = new mongoose.Schema({
  CreatedBy: { type: String },
  CreatedDate: { type: Date, default: Date.now },
  Deleted: { type: Boolean },
  ModifiedBy: { type: String },
  ModifiedDate: { type: Date },
  PortalName: { type: String, required: true },
  Status: { type: Number, required: true }
});
portalSchema.plugin(autoIncrement.plugin, {
  model: "Portal",
  field: "ID"
});

var Portal = mongoose.model("Portal", portalSchema);

const PortalValidation = Joi.object().keys({
  _id: Joi.optional(),
  ID: Joi.optional(),
  CreatedBy: Joi.optional(),
  CreatedDate: Joi.optional(),
  Deleted: Joi.optional(),
  ModifiedBy: Joi.optional(),
  ModifiedDate: Joi.optional(),
  PortalName: Joi.string()
    .max(200)
    .required(),
  Status: Joi.number()
    .max(1)
    .required()
});

var projectSchema = new mongoose.Schema({
  CreatedBy: { type: String },
  CreatedDate: { type: Date, default: Date.now },
  Deleted: { type: Boolean },
  EmpFullName: { type: String },
  EstimatedCost: { type: Number },
  EstimatedTime: { type: Number },
  ModifiedBy: { type: String },
  ModifiedDate: { type: Date },
  ProjectDesc: { type: String },
  ProjectTitle: { type: String, required: true },
  ProjectURL: { type: String },
  Remark: { type: String },
  ResourceID: { type: Number },
  Status: { type: Number, required: true },
  /////////////****************** */
  // PortalName: { type: String },
  // Portals: 2
  /////////////****************** */
  portals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portal" }]
});
projectSchema.plugin(autoIncrement.plugin, {
  model: "Project",
  field: "ID"
});

var Project = mongoose.model("Project", projectSchema);

const ProjectValidation = Joi.object().keys({
  _id: Joi.optional(),
  ID: Joi.optional(),
  CreatedBy: Joi.optional(),
  CreatedDate: Joi.optional(),
  Deleted: Joi.optional(),
  EmpFullName: Joi.string()
    .max(200)
    .optional(),
  EstimatedCost: Joi.optional(),
  EstimatedTime: Joi.optional(),
  ModifiedBy: Joi.optional(),
  ModifiedDate: Joi.optional(),
  ProjectDesc: Joi.string()
    .max(2000)
    .optional(),
  ProjectTitle: Joi.string()
    .max(200)
    .required(),
  ProjectURL: Joi.string()
    .max(1000)
    .optional(),
  Remark: Joi.string()
    .max(2000)
    .optional(),
  ResourceID: Joi.optional(),
  Status: Joi.number()
    .max(10)
    .required(),
  portal: Joi.optional(),
  Portal_ID: Joi.optional()
});

/////////////////////////////////////
//////   HR                      ////
/////////////////////////////////////
var countrySchema = new mongoose.Schema({
  CountryName: { type: String, required: true },
  states: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
countrySchema.plugin(autoIncrement.plugin, {
  model: "Country",
  field: "CountryID"
});
var Country = mongoose.model("Country", countrySchema);

const CountryValidation = Joi.object().keys({
  _id: Joi.optional(),
  CountryID: Joi.optional(),
  CountryName: Joi.string()
    .max(200)
    .required()
});

var stateSchema = new mongoose.Schema({
  StateName: { type: String, required: true },
  country: [{ type: mongoose.Schema.Types.ObjectId, ref: "Country" }],
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }]
});
stateSchema.plugin(autoIncrement.plugin, {
  model: "State",
  field: "StateID"
});
var State = mongoose.model("State", stateSchema);

const StateValidation = Joi.object().keys({
  _id: Joi.optional(),
  CountryID: Joi.optional(),
  StateName: Joi.string()
    .max(200)
    .required()
});

var citySchema = new mongoose.Schema({
  CityName: { type: String, required: true },
  state: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
citySchema.plugin(autoIncrement.plugin, {
  model: "City",
  field: "CityID"
});
var City = mongoose.model("City", citySchema);

const CityValidation = Joi.object().keys({
  _id: Joi.optional(),
  StateID: Joi.optional(),
  CityName: Joi.string()
    .max(200)
    .required()
});

/////////////////////////////////
/////////////company////////////
var companySchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Address: { type: String, required: true },
  PostalCode: { type: Number, required: true },
  Website: { type: String, required: true },
  Email: { type: String, required: true },
  ContactPerson: { type: String, required: true },
  ContactNo: { type: String, required: true },
  FaxNo: { type: String, required: true },
  PanNo: { type: String, required: true },
  GSTNo: { type: String, required: true },
  CINNo: { type: String, required: true },
  Deleted: { type: Boolean },
  city: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }]
});
citySchema.plugin(autoIncrement.plugin, {
  model: "Company",
  field: "CompanyID"
});
var Company = mongoose.model("Company", companySchema);

const CompanyValidation = Joi.object().keys({
  _id: Joi.optional(),
  CityID: Joi.optional(),
  CompanyName: Joi.string()
    .max(200)
    .required(),
  Address: Joi.string()
    .max(2000)
    .required(),
  PostalCode: Joi.number()
    .max(999999)
    .required(),
  Website: Joi.string()
    .max(2000)
    .required(),
  Email: Joi.string()
    .max(1000)
    .required(),
  ContactPerson: Joi.string()
    .max(200)
    .required(),
  ContactNo: Joi.string()
    .max(20)
    .required(),
  FaxNo: Joi.string()
    .max(100)
    .required(),
  PanNo: Joi.string()
    .max(200)
    .required(),
  GSTNo: Joi.string()
    .max(200)
    .required(),
  CINNo: Joi.string()
    .max(200)
    .required(),
  Deleted: Joi.optional()
});

app.get("/api/role", verifyAdminHR, (req, res) => {
  Role.find()
    .populate("company")
    .exec(function (err, role) {
      res.send(role);
    });
});

app.post("/api/role", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newRole;

      newRole = {
        RoleName: req.body.RoleName,
        company: req.body.CompanyID
      };

      Role.create(newRole, function (err, role) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(role);
          console.log("new Role Saved");
        }
      });
      // }
      console.log(req.body);
    }
  });
});

app.put("/api/role/:id", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateRole;

      updateRole = {
        RoleName: req.body.RoleName,
        company: req.body.CompanyID
      };

      Role.findByIdAndUpdate(req.params.id, updateRole, function (err, role) {
        if (err) {
          res.send("error");
        } else {
          res.send(updateRole);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});
app.delete("/api/role/:id", verifyAdminHR, (req, res) => {
  Employee.find({ role: req.params.id }, function (err, r) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (r.length == 0) {
        Role.findByIdAndRemove({ _id: req.params.id }, function (err, role) {
          if (!err) {
            console.log(" Role deleted");
            res.send(role);
          } else {
            console.log("error");
            res.send("err");
          }
        });
        console.log("delete");
        console.log(req.params.id);
      } else {
        res
          .status(403)
          .send(
            "This role is associated with Employee so you can not delete this"
          );
      }
    }
  });
});
app.get("/api/position", verifyAdminHR, (req, res) => {
  Position.find()
    .populate("company")
    .exec(function (err, role) {
      res.send(role);
    });
});

app.post("/api/position", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, PositionValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newPosition;

      newPosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
      };

      Position.create(newPosition, function (err, position) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(position);
          console.log("new Role Saved");
        }
      });
    }
    console.log(req.body);
  });
});
app.put("/api/position/:id", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, PositionValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updatePosition;

      updatePosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
      };

      Position.findByIdAndUpdate(req.params.id, updatePosition, function (
        err,
        position
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updatePosition);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/position/:id", verifyAdminHR, (req, res) => {
  Employee.find({ position: req.params.id }, function (err, p) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (p.length == 0) {
        Position.findByIdAndRemove({ _id: req.params.id }, function (
          err,
          position
        ) {
          if (!err) {
            console.log("position deleted");
            res.send(position);
            // });
            console.log("new Position Saved");
          } else {
            console.log("error");
            res.send("err");
          }
        });
        console.log("delete");
        console.log(req.params.id);
      } else {
        res
          .status(403)
          .send(
            "This Position is associated with Employee so you can not delete this"
          );
      }
    }
  });
});

//Department
app.get("/api/department", verifyAdminHR, (req, res) => {
  Department.find()
    .populate("company")
    .exec(function (err, employees) {
      res.send(employees);
    });
});
app.post("/api/department", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newDepartment;

      newDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      Department.create(newDepartment, function (err, department) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(department);
          console.log("new Role Saved");
        }
      });
    }
    console.log(req.body);
  });
});
app.put("/api/department/:id", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateDepartment;

      updateDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      Department.findByIdAndUpdate(req.params.id, updateDepartment, function (
        err,
        department
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updateDepartment);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/department/:id", verifyAdminHR, (req, res) => {
  Employee.find({ department: req.params.id }, function (err, d) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (d.length == 0) {
        Department.findByIdAndRemove({ _id: req.params.id }, function (
          err,
          department
        ) {
          if (!err) {
            console.log("department deleted");
            res.send(department);
            // });
            console.log("new Department Saved");
          } else {
            console.log("error");
            res.send("err");
          }
        });
        console.log("delete");
        console.log(req.params.id);
      } else {
        res
          .status(403)
          .send(
            "This department is associated with Employee so you can not delete this"
          );
      }
    }
  });
});

app.get("/api/admin/portal", verifyAdmin, (req, res) => {
  Portal.find()
    .populate({ path: "projects" })
    .exec(function (err, portalData) {
      if (err) {
        res.send("err");
        console.log(err);
      }
      res.send(portalData);
    });
});

app.post("/api/admin/portal", verifyAdmin, (req, res) => {
  Joi.validate(req.body, PortalValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newPortal;
      newPortal = {
        PortalName: req.body.PortalName,
        Status: req.body.Status
      };

      Portal.create(newPortal, function (err, portalData) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(portalData);
          console.log("new Portal Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/admin/portal/:id", verifyAdmin, (req, res) => {
  Joi.validate(req.body, PortalValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updatePortal;
      updatePortal = {
        PortalName: req.body.PortalName,
        Status: req.body.Status
      };
      Portal.findByIdAndUpdate(req.body._id, updatePortal, function (
        err,
        Portal
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updatePortal);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/admin/portal/:id", verifyAdmin, (req, res) => {
  Portal.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
    if (!err) {
      console.log("portal deleted");
      res.send(portal);
      Project.deleteMany({ portals: { _id: portal._id } }, function (err) {
        if (err) {
          res.send("error");
          console.log(err);
        }
      });
      console.log("new Portal Saved");
    } else {
      console.log("error");
      res.send("err");
    }
  });
  console.log("delete");
  console.log(req.params.id);
});

///*********bid */

app.get("/api/admin/project-bid", verifyAdmin, (req, res) => {
  // var employee = {};

  Project.find()
    .populate("portals")
    .exec(function (err, project) {
      if (err) {
        console.log(err);
        res.send("err");
      } else {
        res.send(project);
      }
    });
});

app.post("/api/admin/project-bid", verifyAdmin, (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let project;
      project = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        portals: req.body.Portal_ID,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark
      };
      Project.create(project, function (err, project) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(project);
          console.log("new project Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/admin/project-bid/:id", verifyAdmin, (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateProject;
      updateProject = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        portals: req.body.Portal_ID,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark
      };

      Project.findByIdAndUpdate(req.params.id, updateProject, function (
        err,
        Project
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updateProject);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/admin/project-bid/:id", verifyAdmin, (req, res) => {
  Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    if (err) {
      console.log("error");
      res.send("err");
    } else {
      console.log("project deleted");
      res.send(project);
    }
  });
  console.log("delete");
  console.log(req.params.id);
});

/////////////////////////////////////
//////   HR                      ////
/////////////////////////////////////

app.get("/api/country", verifyHR, (req, res) => {
  Country.find()
    .populate({ path: "states", populate: { path: "cities" } })
    .exec(function (err, country) {
      res.send(country);
    });
});

app.post("/api/country", verifyHR, (req, res) => {
  Joi.validate(req.body, CountryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newCountry;

      newCountry = {
        CountryName: req.body.CountryName
      };

      Country.create(newCountry, function (err, country) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(country);
          console.log("new country Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/country/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, CountryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newCountry;

      newCountry = {
        CountryName: req.body.CountryName
      };
      Country.findByIdAndUpdate(req.params.id, newCountry, function (
        err,
        country
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newCountry);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/country/:id", verifyHR, (req, res) => {
  Country.findById(req.params.id, function (err, foundCountry) {
    if (err) {
      res.send(err);
    } else {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
      if (!foundCountry.states.length == 0) {
        res
          .status(403)
          .send(
            "First Delete All The states in this country before deleting this country"
          );
      } else {
        Country.findByIdAndRemove({ _id: req.params.id }, function (
          err,
          country
        ) {
          if (!err) {
            State.deleteMany({ country: { _id: req.params.id } }, function (
              err
            ) {
              if (err) {
                console.log(err);
                res.send("error");
              } else {
                City.deleteMany(
                  { state: { country: { _id: req.params.id } } },
                  function (err) {
                    if (err) {
                      console.log(err);
                      res.send("error");
                    } else {
                      console.log(" Country deleted");
                      res.send(country);
                    }
                  }
                );
              }
            });
          } else {
            console.log(err);
            res.send("error");
          }
        });
      }
    }
  });

  console.log("delete");
  console.log(req.params.id);
});

app.get("/api/state", verifyHR, (req, res) => {
  State.find()
    .populate("country citiesx")
    .exec(function (err, country) {
      res.send(country);
    });
});
//State
app.post("/api/state", verifyHR, (req, res) => {
  Joi.validate(req.body, StateValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newState;

      newState = {
        StateName: req.body.StateName,
        country: req.body.CountryID
      };

      State.create(newState, function (err, state) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          Country.findById(req.body.CountryID, function (err, country) {
            if (err) {
              console.log(err);
              res.send("err");
            } else {
              country.states.push(state);
              country.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(state);
                }
              });
            }
          });
          console.log("new country Saved");
        }
      });
      console.log(req.body);
    }
  });
});
//State
//state
app.put("/api/state/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, StateValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newState;

      newState = {
        StateName: req.body.StateName,
        country: req.body.CountryID
      };

      State.findByIdAndUpdate(req.params.id, newState, function (err, state) {
        if (err) {
          res.send("error");
        } else {
          res.send(newState);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/state/:id", verifyHR, (req, res) => {
  State.findById(req.params.id, function (err, foundState) {
    if (err) {
      res.send(err);
    } else {
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
      if (!foundState.cities.length == 0) {
        res
          .status(403)
          .send(
            "First Delete All The cities in this state before deleting this state"
          );
      } else {
        State.findByIdAndRemove({ _id: req.params.id }, function (err, state) {
          if (!err) {
            console.log(" state deleted");
            console.log("country id---------", state.country[0]);
            Country.update(
              { _id: state.country[0] },
              { $pull: { states: state._id } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(state);
              }
            );
          } else {
            console.log(err);
            res.send("error");
          }
        });
      }
    }
  });

  console.log("delete");
  console.log(req.params.id);
});

/////////////city

app.get("/api/city", verifyHR, (req, res) => {
  City.find()
    .populate({ path: "state", populate: { path: "country" } })
    .exec(function (err, city) {
      // employee = employees;
      res.send(city);
    });
});
app.post("/api/city", verifyHR, (req, res) => {
  Joi.validate(req.body, CityValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newCity;

      newCity = {
        CityName: req.body.CityName,
        state: req.body.StateID
      };

      City.create(newCity, function (err, city) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          State.findById(req.body.StateID, function (err, state) {
            if (err) {
              console.log(err);
              res.send("err");
            } else {
              state.cities.push(city);
              state.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(city);
                }
              });
            }
          });

          console.log("new city Saved");
        }
      });
      console.log(req.body);
    }
  });
});
app.put("/api/city/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, CityValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newCity;

      newCity = {
        CityName: req.body.CityName,
        state: req.body.StateID
      };

      City.findByIdAndUpdate(req.params.id, newCity, function (err, city) {
        if (err) {
          res.send("error");
        } else {
          res.send(newCity);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/city/:id", verifyHR, (req, res) => {
  Company.find({ city: req.params.id }, function (err, country) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(country.length == 0);
      if (country.length == 0) {
        City.findByIdAndRemove({ _id: req.params.id }, function (err, city) {
          if (!err) {
            console.log(" state deleted");
            State.update(
              { _id: city.state[0] },
              { $pull: { cities: city._id } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(city);
              }
            );
          } else {
            console.log(err);
            res.send("error");
          }
        });
      } else {
        res
          .status(403)
          .send(
            "This city is associated with company so you can not delete this"
          );
      }
    }
  });

  console.log("delete");
  console.log(req.params.id);
});

///////////////////////////
////////////company

app.get("/api/company", verifyAdminHR, (req, res) => {
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  Company.find()
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "city",
      populate: {
        path: "state",
        model: "State",
        populate: {
          path: "country",
          model: "Country"
        }
      }
    })
    .exec(function (err, compnay) {
      res.send(compnay);
    });
});
app.post("/api/company", verifyHR, (req, res) => {
  Joi.validate(req.body, CompanyValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newCompany;

      newCompany = {
        CompanyName: req.body.CompanyName,
        Address: req.body.Address,
        city: req.body.CityID,
        PostalCode: req.body.PostalCode,
        Website: req.body.Website,
        Email: req.body.Email,
        ContactPerson: req.body.ContactPerson,
        ContactNo: req.body.ContactNo,
        FaxNo: req.body.FaxNo,
        PanNo: req.body.PanNo,
        GSTNo: req.body.GSTNo,
        CINNo: req.body.CINNo
      };

      Company.create(newCompany, function (err, company) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(newCompany);
          console.log("new company Saved");
        }
      });
      console.log(req.body);
    }
  });
});
app.put("/api/company/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, CompanyValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newCompany;

      newCompany = {
        CompanyName: req.body.CompanyName,
        Address: req.body.Address,
        city: req.body.CityID,
        PostalCode: req.body.PostalCode,
        Website: req.body.Website,
        Email: req.body.Email,
        ContactPerson: req.body.ContactPerson,
        ContactNo: req.body.ContactNo,
        FaxNo: req.body.FaxNo,
        PanNo: req.body.PanNo,
        GSTNo: req.body.GSTNo,
        CINNo: req.body.CINNo
      };

      Company.findByIdAndUpdate(req.params.id, newCompany, function (
        err,
        company
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newCompany);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});
/////////////////////////////////
/////////////////////Employee

app.get("/api/employee", verifyHR, (req, res) => {
  // {path: 'projects', populate: {path: 'portals'}}
  Employee.find()
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "role position department"
      // populate: {
      //   path: "state",
      //   model: "State",
      //   populate: {
      //     path: "country",
      //     model: "Country"
      //   }
      // }
    })
    .select("-salary -education -familyInfo -workExperience -Password")
    .exec(function (err, employee) {
      res.send(employee);
    });
});

app.post("/api/employee", verifyHR, (req, res) => {
  Joi.validate(req.body, EmployeeValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;

      newEmployee = {
        Email: req.body.Email,
        Password: req.body.Password,
        role: req.body.RoleID,
        Account: req.body.Account,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        position: req.body.PositionID,
        DateOfJoining: req.body.DateOfJoining,
        TerminateDate: req.body.TerminateDate
      };

      Employee.create(newEmployee, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(employee);

          console.log("new employee Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/employee/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;
      newEmployee = {
        Email: req.body.Email,
        // Password: req.body.Password,
        Account: req.body.Account,
        role: req.body.RoleID,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        position: req.body.PositionID,
        DateOfJoining: req.body.DateOfJoining,
        TerminateDate: req.body.TerminateDate
      };

      Employee.findByIdAndUpdate(req.params.id, newEmployee, function (
        err,
        employee
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newEmployee);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/employee/:id", verifyHR, (req, res) => {
  // Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
  //   if (!err) {
  //     console.log(" state deleted");
  //     res.send(employee);
  //   } else {
  //     console.log(err);
  //     res.send("error");
  //   }
  // });
  res.send("error");
  console.log("delete");
  console.log(req.params.id);
});

////////////////////////////////
//////////////////salary
app.get("/api/salary", verifyHR, (req, res) => {
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  Employee.find()
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "salary"
      // populate: {
      //   path: "state",
      //   model: "State",
      //   populate: {
      //     path: "country",
      //     model: "Country"
      //   }
      // }
    })
    // .select(" -role -position -department")
    .select("FirstName LastName MiddleName")
    .exec(function (err, company) {
      // employee = employees;
      let filteredCompany = company.filter(data => data["salary"].length == 1);
      // console.log(filteredCompany);
      res.send(filteredCompany);
    });
});

app.post("/api/salary/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          if (employee.salary.length == 0) {
            let newSalary;

            newSalary = {
              BasicSalary: req.body.BasicSalary,
              BankName: req.body.BankName,
              AccountNo: req.body.AccountNo,
              AccountHolderName: req.body.AccountHolderName,
              IFSCcode: req.body.IFSCcode,
              TaxDeduction: req.body.TaxDeduction
            };

            Salary.create(newSalary, function (err, salary) {
              if (err) {
                console.log(err);
                res.send("error");
              } else {
                employee.salary.push(salary);
                employee.save(function (err, data) {
                  if (err) {
                    console.log(err);
                    res.send("err");
                  } else {
                    console.log(data);
                    res.send(salary);
                  }
                });
                console.log("new salary Saved");
              }
            });
            console.log(req.body);
          } else {
            res
              .status(403)
              .send("Salary Information about this employee already exits");
          }
        }
      });
    }
  });
});

app.put("/api/salary/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newSalary;

      newSalary = {
        BasicSalary: req.body.BasicSalary,
        BankName: req.body.BankName,
        AccountNo: req.body.AccountNo,
        AccountHolderName: req.body.AccountHolderName,
        IFSCcode: req.body.IFSCcode,
        TaxDeduction: req.body.TaxDeduction
      };

      Salary.findByIdAndUpdate(req.params.id, newSalary, function (err, salary) {
        if (err) {
          res.send("error");
        } else {
          res.send(newSalary);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/salary/:id", verifyHR, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    console.log("uuuuuuuunnnnnnnnnnnnnnndef", employee.salary[0]);
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      Salary.findByIdAndRemove({ _id: employee.salary[0] }, function (
        err,
        salary
      ) {
        if (!err) {
          console.log("salary deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { salary: employee.salary[0] } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(salary);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

//////////////////////////////////////
/////////////////////////////////////
/////////////////////////////Employee dashboard
/////////////////////////////////////
/////////////////////////////////////

////////////////////////////////////
////////////////////////////personal info

app.get("/api/personal-info/:id", verifyHREmployee, (req, res) => {
  console.log("personal-info", req.params.id);
  Employee.findById(req.params.id)
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "role position department"
      //   // populate: {
      //   //   path: "state",
      //   //   model: "State",
      //   //   populate: {
      //   //     path: "country",
      //   //     model: "Country"
      //   //   }
      //   // }
    })
    .select("-salary -education -familyInfo -workExperience")
    .exec(function (err, employee) {
      // employee = employees;
      res.send(employee);
    });
});

app.put("/api/personal-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;

      newEmployee = {
        BloodGroup: req.body.BloodGroup,
        ContactNo: req.body.ContactNo,
        DOB: req.body.DOB,
        Email: req.body.Email,
        EmergencyContactNo: req.body.EmergencyContactNo,
        Gender: req.body.Gender,
        Hobbies: req.body.Hobbies,
        PANcardNo: req.body.PANcardNo,
        PermanetAddress: req.body.PermanetAddress,
        PresentAddress: req.body.PresentAddress
      };
      Employee.findByIdAndUpdate(
        req.params.id,
        {
          $set: newEmployee
        },
        function (err, numberAffected) {
          console.log(numberAffected);
          res.send(newEmployee);
        }
      );
    }

    console.log("put");
    console.log(req.body);
  });
});

////////////////////////////////
////////////////////education
app.get("/api/education/:id", verifyHREmployee, (req, res) => {
  console.log(req.params.id);
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  Employee.findById(req.params.id)
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "education"
      // populate: {
      //   path: "state",
      //   model: "State",
      //   populate: {
      //     path: "country",
      //     model: "Country"
      //   }
      // }
    })
    // .select(" -role -position -department")
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      // console.log(filteredCompany);
      res.send(employee);
    });
});

app.post("/api/education/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EducationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newEducation;

          newEducation = {
            SchoolUniversity: req.body.SchoolUniversity,
            Degree: req.body.Degree,
            Grade: req.body.Grade,
            PassingOfYear: req.body.PassingOfYear
          };

          Education.create(newEducation, function (err, education) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.education.push(education);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(education);
                }
              });
              console.log("new Education Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/education/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EducationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEducation;

      newEducation = {
        SchoolUniversity: req.body.SchoolUniversity,
        Degree: req.body.Degree,
        Grade: req.body.Grade,
        PassingOfYear: req.body.PassingOfYear
      };

      Education.findByIdAndUpdate(req.params.id, newEducation, function (
        err,
        education
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newEducation);
        }
      });
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/education/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      Education.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        education
      ) {
        if (!err) {
          console.log("education deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { education: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(education);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

//////////////////////////////////
//////////////////////////familyInfo
app.get("/api/family-info/:id", verifyHREmployee, (req, res) => {
  console.log(req.params.id);
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  Employee.findById(req.params.id)
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "familyInfo"
      // populate: {
      //   path: "state",
      //   model: "State",
      //   populate: {
      //     path: "country",
      //     model: "Country"
      //   }
      // }
    })
    // .select(" -role -position -department")
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      // console.log(filteredCompany);
      res.send(employee);
    });
});

app.post("/api/family-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newFamilyInfo;

          newFamilyInfo = {
            Name: req.body.Name,
            Relationship: req.body.Relationship,
            DOB: req.body.DOB,
            Occupation: req.body.Occupation
          };

          FamilyInfo.create(newFamilyInfo, function (err, familyInfo) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.familyInfo.push(familyInfo);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(familyInfo);
                }
              });
              console.log("new familyInfo Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/family-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newFamilyInfo;

      newFamilyInfo = {
        Name: req.body.Name,
        Relationship: req.body.Relationship,
        DOB: req.body.DOB,
        Occupation: req.body.Occupation
      };

      FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo, function (
        err,
        familyInfo
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newFamilyInfo);
        }
      });
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/family-info/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      FamilyInfo.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        familyInfo
      ) {
        if (!err) {
          console.log("FamilyInfo deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { familyInfo: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(familyInfo);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

//////////////////////////////////
//////////////////////////WorkExperience workExperience
app.get("/api/work-experience/:id", verifyHREmployee, (req, res) => {
  console.log(req.params.id);
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  Employee.findById(req.params.id)
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "workExperience"
      // populate: {
      //   path: "state",
      //   model: "State",
      //   populate: {
      //     path: "country",
      //     model: "Country"
      //   }
      // }
    })
    // .select(" -role -position -department")
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      res.send(employee);
    });
});

app.post("/api/work-experience/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newWorkExperience;

          newWorkExperience = {
            CompanyName: req.body.CompanyName,
            Designation: req.body.Designation,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate
          };

          WorkExperience.create(newWorkExperience, function (
            err,
            workExperience
          ) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.workExperience.push(workExperience);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(workExperience);
                }
              });
              console.log("new WorkExperience Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/work-experience/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newWorkExperience;

      newWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate
      };

      WorkExperience.findByIdAndUpdate(
        req.params.id,
        newWorkExperience,
        function (err, workExperience) {
          if (err) {
            res.send("error");
          } else {
            res.send(newWorkExperience);
          }
        }
      );
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/Work-experience/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      WorkExperience.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        workExperience
      ) {
        if (!err) {
          console.log("WorkExperience deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { workExperience: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(workExperience);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

/////////////////////
////////////LeaveApplication leaveApplication leave-application-emp
app.get("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  console.log(req.params.id);
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  Employee.findById(req.params.id)
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "leaveApplication"
      // populate: {
      //   path: "state",
      //   model: "State",
      //   populate: {
      //     path: "country",
      //     model: "Country"
      //   }
      // }
    })
    // .select(" -role -position -department")
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      // console.log(filteredCompany);
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(employee);
      }
    });
});

app.post("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newLeaveApplication;
          newLeaveApplication = {
            Leavetype: req.body.Leavetype,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
            Reasonforleave: req.body.Reasonforleave,
            Status: req.body.Status,
            employee: req.params.id
          };

          LeaveApplication.create(newLeaveApplication, function (
            err,
            leaveApplication
          ) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.leaveApplication.push(leaveApplication);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(leaveApplication);
                }
              });
              console.log("new leaveApplication Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id
      };

      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        newLeaveApplication,
        function (err, leaveApplication) {
          if (err) {
            res.send("error");
          } else {
            res.send(newLeaveApplication);
          }
        }
      );
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete(
  "/api/leave-application-emp/:id/:id2",
  verifyEmployee,
  (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
      if (err) {
        res.send("error");
        console.log(err);
      } else {
        LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
          err,
          leaveApplication
        ) {
          if (!err) {
            console.log("LeaveApplication deleted");
            Employee.update(
              { _id: req.params.id },
              { $pull: { leaveApplication: req.params.id2 } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(leaveApplication);
              }
            );
          } else {
            console.log(err);
            res.send("error");
          }
        });
        console.log("delete");
        console.log(req.params.id);
      }
    });
  }
);

/////////////////////
////////////LeaveApplication leaveApplication HHHHHHRRRRR
app.get("/api/leave-application-hr", verifyHR, (req, res) => {
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  LeaveApplication.find()
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "employee"
    })
    // .select(" -role -position -department")
    // .select("FirstName LastName MiddleName"
    // )
    .exec(function (err, leaveApplication) {
      // console.log(filteredCompany);
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(leaveApplication);
      }
    });
});

app.put("/api/leave-application-hr/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, LeaveApplicationHRValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Status: req.body.Status
      };
      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        {
          $set: newLeaveApplication
        },
        function (err, numberAffected) {
          console.log(numberAffected);
          res.send(newLeaveApplication);
        }
      );

      console.log(req.body);
    }
  });
});

app.delete("/api/leave-application-hr/:id/:id2", verifyHR, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        leaveApplication
      ) {
        if (!err) {
          console.log("LeaveApplication deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { leaveApplication: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(leaveApplication);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

//////////////////////////////////
/////////////////////login

app.post("/api/login", (req, res) => {
  Joi.validate(
    req.body,
    Joi.object().keys({
      email: Joi.string()
        .max(200)
        .required(),
      password: Joi.string()
        .max(100)
        .required()
    }),
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.details[0].message);
      } else {
        Employee.findOne(
          { Email: req.body.email },
          "Password _id Account FirstName LastName",
          function (err, document) {
            if (err || document == null) {
              res.send("false");
            } else {
              if (document.Password == req.body.password) {
                emp = {
                  _id: document._id,
                  Account: document.Account,
                  FirstName: document.FirstName,
                  LastName: document.LastName
                };
                var token = jwt.sign(emp, jwtKey);
                res.send(token);
              } else {
                res.sendStatus(400);
              }
            }
          }
        );
      }
    }
  );
});

// middleware

function verifyAdmin(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];

  if (typeof Header !== "undefined") {
    // decodedData = jwt.decode(req.headers['authorization']);
    // if(decodedData.Account)
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 1) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
function verifyAdminHR(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];

  if (typeof Header !== "undefined") {
    // decodedData = jwt.decode(req.headers['authorization']);
    // if(decodedData.Account)
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 1 || authData.Account == 2) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
function verifyHR(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];

  if (typeof Header !== "undefined") {
    // decodedData = jwt.decode(req.headers['authorization']);
    // if(decodedData.Account)
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 2) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
function verifyHREmployee(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];

  if (typeof Header !== "undefined") {
    // decodedData = jwt.decode(req.headers['authorization']);
    // if(decodedData.Account)
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 2) {
          next();
        } else if (authData.Account == 3) {
          if (authData._id == req.params.id) {


            next();
          }
          else {
            res.sendStatus(403);

          }


        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
function verifyEmployee(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];

  if (typeof Header !== "undefined") {
    // decodedData = jwt.decode(req.headers['authorization']);
    // if(decodedData.Account)
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData._id == req.params.id) {
          console.log(authData);
          if (authData.Account == 3) {
            next();
          } else {
            res.sendStatus(403);
          }
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

var port = process.env.PORT;
if (port & process.env.IP) {
  app.listen(port, process.env.IP, () => {
    console.log("started");
  });
} else
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
