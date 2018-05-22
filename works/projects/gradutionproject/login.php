<?php
    ob_start();
    session_start();
    $pageTitle = 'Login';

/* ================================================================================================================================================ */

/* => if is there opened/runed session enter to index page(main page) */
    if (isset($_SESSION['User'])){
     header('Location: index.php');
}

/* => include init.php file */
    include 'init.php';

/* ================================================================================================================================================ */
/* ================================================================================================================================================ */

if ($_SERVER['REQUEST_METHOD']=='POST'){
    if(isset($_POST['login'])){
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $hashedpass = sha1($pass);
    

/* ================================================================================================================================================ */

//check if the user exist in database
    $stmt = $con->prepare("SELECT 
                                UserID, UserName, PassWord 
                          FROM 
                                users 
                          WHERE 
                                UserName = ? 
                          AND 
                                PassWord = ? 
                          ");
    
    $stmt->execute(array($user, $hashedpass));
    $get = $stmt->fetch();
    $count = $stmt->rowCount();
    
    if($count > 0 ){
        $_SESSION['user'] = $user;
        $_SESSION['uid']  = $get['UserID'];
        header('Location:index.php');
        exit();
    }
        
    }else{
        $formErrors = array();
        
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email    = $_POST['email'];
        $full     = $_POST['full'];
        
    /* => error form */
        
/* ================================================================================================================================================ */
/* ================================================================================================================================================ */
/* ================================================================================================================================================ */

        if(isset($username)){
            $filterUser = filter_var($username, FILTER_SANITIZE_STRING);
            if(strlen($filterUser) < 4) {
                $formErrors[] = 'Username Must Be Larger Than 4 Characters';
            }
        }
        
        if(isset($password)){
            if(empty($password)){
                $formErrors[] = 'Sorry Password Can not Be Empty';
            }
            $pass = sha1($password);
        }
        
        $formErrors = array();
        if(isset($email)){
            $filterEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
            if(filter_var($filterEmail, FILTER_VALIDATE_EMAIL) != true) {
                $formErrors[] = 'This Email Is Not Valid';
            }
        }
        
        
    
        if (empty($formErrors)) {
                //check if user exist in database
                $check = checkItem("UserName", "users", $username);
                    if($check == 1){
                           $formErrors[] = 'Sorry, This User Is Exists';
                    }else {
                //insert userinfo in database
                $stmt = $con->prepare("INSERT INTO 
                                      users(UserName, Password, Email, FullName, RegStatus, Date) 
                                      VALUES(:zuser, :zpass, :zmail, :zfull, 0, now())");
                $stmt->execute(array(
                'zuser'         => $username,
                'zpass'         => sha1($password),
                'zmail'         => $email,
                'zfull'         => $full
                ));
                    
                //Echo Success Message 
                        echo "<div class = 'container'>";
                $successMsg = 'Congrats You Are Now Registerd User';
                        echo "</div>";
                    }
            }
    }
}
?>

<!-- ============================================================================================================================================= -->
<!-- ============================================================================================================================================= -->
<!-- ============================================================================================================================================= -->

<div class="container login-page">
    <h1 class="text-center">
    <span class="selected btn" data-class="login">Login</span> 
    <span class="selected btn" data-class="signup">SignUp</span>
    </h1>
    
<!-- ============================================================================================================================================= -->
<!-- ============================================================================================================================================= -->

    <!--start login form-->
    <form class="login" action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
        <input class="form-control" type="text" name="username" autocomplete="off" placeholder="UserName" />
        <input class="form-control" type="password" name="password" autocomplete="new-passowrd" placeholder="Password"/>
        <input class="select-sub btn btn-block" name="login" type="submit" value="Login" />
    </form>
     <!--end login form-->
    
<!-- ============================================================================================================================================= -->
<!-- ============================================================================================================================================= --> 

     <!--start signup form-->
<form class="signup" action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
        
        <div class="input-container">
            <input pattern=".{4,}" title="Username Must Be More Than 4 Chars" class="form-control" type="text" name="username" autocomplete="off" placeholder="UserName" required="required"/>
        </div>
    
        <div class="input-container">
            <input class="form-control" type="text" name="full" autocomplete="off" placeholder="Full Name" required="required"/>
        </div>
    
        <div class="input-container">
            <input class="form-control" type="email" name="email" autocomplete="off" placeholder="Email" required="required"/>
        </div>

                
        <div class="input-container">
            <input minlength="4" class="form-control" type="password" name="password" autocomplete="new-passowrd" placeholder="Password" required="required"/>
        </div>
        
        <input class="select-sub btn btn-block" name="signup" type="submit" value="SignUp" />
        
</form>
    
<!-- ============================================================================================================================================= -->
<!-- ============================================================================================================================================= -->

        <div class="the-errors text-center">
            <?php
            if(!empty($formErrors)){
             foreach ($formErrors as $error){
                 echo $error . '<br>';
             }   
            }
          
          if(isset($successMsg)){
              echo '<div class="msg success">' . $successMsg . '</div>';
          }
            ?>
        </div>
    
<!-- ============================================================================================================================================= -->
<!-- ============================================================================================================================================= -->

</div>

<!-- ============================================================================================================================================= -->

<?php
    include $tpl . 'footer.php';
    ob_end_flush();
?>