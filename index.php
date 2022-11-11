<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>NPH Time Tracking App</title>
</head>
<body>
    <header>
        <h1>Time Tracking App</h1>
    </header>

    <div id="container">
        <div id="register-form">
            <form action="" method="POST">
                <label>Category</label>
                <select id="category" name="category">
                    <option value="marketing">Marketing</option>
                    <option value="website">Website</option>
                    <option value="meetings">Meetings</option>
                </select>
                <label>Task Description</label>
                <textarea name="description" id="description" rows="0"></textarea>
                <label>Time (Min)</label>
                <input name="time" id="time"  type="number" ></input>
                <input type="submit" value="Submit" name="submit">
            </form>
        </div>
        <div id="view-form">
            <button id="get-activities-btn"> View Activities Breakdown </button>
            <div id="graphs-container">
                <canvas id="graph" width=400></canvas>
                <canvas id="graph-2" width=400></canvas>
                <div id="error-message">
                    <img src="images/not_available.png">
                    <h1> No activities stored on that day </h1>
                </div>
            </div>
            <div id="total-time-display" ><h1> Total Amount of Hours: <span id="total"></span></h1> </div>
            <div id="buttons-container"></div>
        </div>

        <div id="confirmation" class="hide">
            <h1>Activity Saved</h1>
            <img src="images/check.png">
        </div>

</div>

<div id="activities-breakdown-container" class="activities-breakdown-hide">
       <h1 id="close"> X </h1>
        <div id="activities-breakdown">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Activity
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Time Spent (Minutes)
                            </th>
                        </tr>
                    </thead>
                <tbody></tbody>
                </table>
            </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/loadRecentDays.js"></script>
    <script src="js/getDay.js"></script>
    <script src="js/activitySaved.js"></script>
    <script src="js/activitiesBreakdown.js"></script>
  <?php 
  
      include "db.php";
      date_default_timezone_set('America/Los_Angeles');
      $d = date("Y-m-d");
      if(isset($_POST['submit'])){
            //Check if current day has been stored in table 
            $today = date("Y-m-d");
            print_r($today);
            echo $today;
            $stmt = $pdo->prepare("SELECT * FROM days WHERE date=:today");
            $stmt->bindParam(":today",$today);
            $stmt->execute();
            $result = $stmt->fetch();
            $name = $_POST['category'];
            $description = $_POST['description'];
            $time = $_POST['time'];
            if($result){
                //If the days is found insert activity into day
                $id = $result['id'];
                $stmt= $pdo->prepare("INSERT INTO activities (id,name, description, time) VALUES(:id,:name,:description,:time)");
                $stmt->bindParam(":id",$id);
                $stmt->bindParam(":name",$name);
                $stmt->bindParam(":description",$description);
                $stmt->bindParam(":time",$time);
                $stmt->execute();
        }else{
                //If the day is not found, insert day into 'days' table
                $stmt= $pdo->prepare("INSERT INTO days (date) VALUES (:today)");
                $stmt->bindParam(":today",$today);
                $stmt->execute();
                $id = $pdo->lastInsertId();
                //Then insert activity into day;
                $stmt= $pdo->prepare("INSERT INTO activities (id,name, description, time) VALUES(:id,:name,:description,:time)");
                $stmt->bindParam(":id",$id);
                $stmt->bindParam(":name",$name);
                $stmt->bindParam(":description",$description);
                $stmt->bindParam(":time",$time);
                $stmt->execute();
        }
      }
  ?>
</body>
</html>