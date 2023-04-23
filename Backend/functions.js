const User = require('../models/user');
const Payment = require('../models/payment');
const Paymenthistory = require('../models/paymenthistory');
const Feedback = require('../models/feedback');
const Customercheck = require('../models/customercheck');

const manager_view_get = async (req,res) => {
    try{
        const {username} = req.params;
        const manager = await User.findOne({username:username,role:'manager'});
        if(manager)
        {
            // res.render('manager/view',{manager:manager});
            res.send(manager);
        }
        else
        {
            res.send("Error occured!");
        }
    } catch(error) {
        res.send("Unable to find Manager");
    }

}

const manager_edit_get = async(req,res) => {
    try{
        const {username} = req.params;
        const manager = await User.findOne({username:username,role:'manager'});
        if(manager)
        {
            // res.render('manager/edit',{manager:manager});
            res.send(manager);
        }
        else
        {
            res.send("Error occured!");
        }
    } catch(error) {
        res.send("Unable to find Manager");
    }
}

const manager_edit_patch = async(req,res) => {
    try {
        const { username } = req.params; // use req.params.username to get the username
        const manager = await User.findOne({ username: username ,role : 'manager' });

        // manager.password = req.body.password;
        manager.fullname = req.body.fullname;
        manager.date = req.body.date;
        manager.email = req.body.email;
        manager.phone = req.body.phone;
        manager.gender = req.body.gender;
        // console.log(manager);
        // res.send(username);

        User.updateOne({ username: username,role:'manager'},
            { $set: { fullname: req.body.fullname, date: req.body.date, email: req.body.email, phone: req.body.phone, gender: req.body.gender }, validate: true })
            .then((result) => {
                console.log(result);
                res.render('manager/index', { manager: manager });
            })
            .catch((err) => {
                console.log(err);
                res.send('cannot update');
            }
            );
       
    } catch (error) {
        console.log(error);
        res.send('An error occurred while finding the manager.');
    }
}

const manager_customercheck_get = async (req,res) => {
    try{
        const username = req.params.username;
        const manager = await User.findOne({username:username, role:'manager'});
        if(manager)
        {
            const today = new Date();
            manager.currentDate = today;
            res.render('manager/customercheck',{manager});
        }
        else {
            res.status(404).send('Manager not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }

    
    //when I amm requesting for the page , what I have to provide is the things
    // date from myside
    // username that I will get
    // and time duration that I will get
    //based on what I have to update the database

    

    //here is the html logic for the page that is going to be loaded
{/* <body>
    <label for="date">Choose a date:</label>
    <input type="date" id="date" name="date" value="<%= manager.currentDate.toISOString().slice(0,10) %>" />
    <% var hour = manager.currentDate.getHours(); %>
    <% if (hour >= 6 && hour < 10) { %>
      <p>It's breakfast time!</p>
    <% } else if (hour >= 10 && hour < 14) { %>
      <p>It's lunch time!</p>
    <% } else if (hour >= 14 && hour < 21) { %>
      <p>It's dinner time!</p>
    <% } else { %>
      <p>It's not meal time.</p>
    <% } %>
  </body> */}
}