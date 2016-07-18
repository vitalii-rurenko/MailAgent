var app = angular.module('app', []);

app.service('mailService', function ($http) {

    //POST
    this.post = function (email) {
        var request = $http({
            method: "post",
            url: "/api/Email",
            data: email
        });
        return request;
    }

    //GET
    this.get = function () {
        var request = $http({
            method: "get",
            url: "/api/Email"
        });
        return request;
    }

    //PUT
    this.put = function (Eid, Mail) {
        var request = $http({
            method: "put",
            url: "/api/Email/" + Eid,
            data: Mail
        });
        return request;
    }

    //DELETE
    this.delete = function (Eid) {
        var request = $http({
            method: "delete",
            url: "/api/Email/" + Eid
        });
        return request;
    }
});

app.controller('mailCtrl', function ($scope, $http, mailService) {

    //repository for mails
    $scope.mails = [];

    //keeps mail to edit ID
    $scope.mailToEditID;

    //method to download all mails from API controller
    $scope.DownloadMails = function () {
        mailService.get().then(function (result) {
            $scope.mails = result.data;
        });
    };

    //method to gather required info from form and send it to POST method
    $scope.SaveMail = function ()
    {
        if ($('form').valid() == true)
        {
            if ($scope.mailToEditID === undefined) {
                //saving mail as usual
                var data = { "EmailAddress": $scope.formsEmail.EmailAddress, "UserName": $scope.formsEmail.UserName, "Subject": $scope.formsEmail.Subject, "Body": $scope.formsEmail.Body };
                mailService.post(JSON.stringify(data)).then(function (result) {
                    $scope.mails.push(result.data);
                });
            }
            else
            {
                //updating mail
                var data = { "ID" : $scope.mailToEditID, "EmailAddress": $scope.formsEmail.EmailAddress, "UserName": $scope.formsEmail.UserName, "Subject": $scope.formsEmail.Subject, "Body": $scope.formsEmail.Body };
                mailService.put($scope.mailToEditID, JSON.stringify(data)).then(function (result) {
                //TO DO swap updated mail with old mail in array
                var indexToSwap = $scope.mails.map(function (mail) {
                    return mail.ID;
                }).indexOf(result.data.ID);
                //swap old mail with updated 
                $scope.mails[indexToSwap] = result.data;
                });
            }
            $scope.ResetForm();
        }      
    };

    //method to fill form with mail to edit
    $scope.FillFormWithMail = function(upMail)
    {
        $scope.formsEmail = angular.copy(upMail);
    }

    //method to delete email by ID
    $scope.DeleteMail = function (id) {
        mailService.delete(id).then(function (result) {
            $scope.mails = $scope.mails.filter(function (mail) {
                return mail.ID != result.data.ID;
            });
        });
    };

    //method reset all fields on main from
    $scope.ResetForm = function () {
        $scope.mailToEditID = undefined;
        $scope.formsEmail.EmailAddress = "";
        $scope.formsEmail.UserName = "";
        $scope.formsEmail.Subject = "";
        $scope.formsEmail.Body = "";

    };

    // method to edit assigned mail
    $scope.EditMail = function (mail) {
        $scope.FillFormWithMail(mail);
        $scope.mailToEditID = mail.ID;
    };

    $scope.DownloadMails();
})