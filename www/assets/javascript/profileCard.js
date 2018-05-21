var cardObj = {
    createCard: function(results) { 
        var bio = gOAuth.userProfile.bio,
            roles = gOAuth.userProfile.roles.map(role => role.jobs);
        bio = (bio) ? bio : "<a href='#'>Add Bio</a>";
    var card = `<div class="block-title" id="block-name">${gOAuth.user.fullName}</div>
        <div class="data-table">
            <table>
                <tbody>
                <tr>
                    <td class="label-cell center-cell">${gOAuth.user.email}</td>
                </tr>
                <tr>
                    <td class="label-cell center-cell" id="profile-pic"><img src='${gOAuth.user.imgURL}'></td>
                </tr>
                <tr>
                    <td class="label-cell">${bio}</td>
                </tr>	
                </tbody>
            </table>
            <table>
                <tbody>
                <tr>
                    <td class="label-cell">Jobs</td>
                    <td class="label-cell">${gOAuth.userProfile.jobs}</td>
                </tr>
                <tr>
                    <td class="label-cell">Connections</td>
                    <td class="label-cell">${gOAuth.userProfile.connections}</td>
                </tr>
                <tr>
                    <td class="label-cell">Roles</td>
                    <td class="label-cell">${roles.join("<br>")}</td>
                </tr>
                </tbody>
            </table>
        </div>`;
   
        $("#profile").append(card);

        $("#logout-button").on("click", function(){   
            //e.preventDefault();
            gOAuth.logOut(); 
        }); 
    }
}