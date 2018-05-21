var cardObj = {
    createCard: function(results) { 
        var alias= (gOAuth.user.fullName === gOAuth.userProfile.name) ? "" :`<p>Posing as ... ${gOAuth.userProfile.name}</p>`,
            bio = gOAuth.userProfile.bio,
            roles = gOAuth.userProfile.roles.map(role => role.jobs);
    var card = `<div class="block-title" id="block-name">${gOAuth.user.fullName}</div>${alias}
        <div class="data-table">
            <table>
                <tbody>
                    <tr>
                        <td class="label-cell center-cell" id="profile-pic"><img src='${gOAuth.user.imgURL}'></td>
                    </tr>	
                    <tr>
                        <td class="label-cell emailRow">${gOAuth.user.email}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>    
                <tr>
                    <td class="label-cell">Connections</td>
                    <td class="label-cell">${gOAuth.userProfile.connections}</td>
                </tr>
                <tr>
                    <td class="label-cell">Jobs</td>
                    <td class="label-cell">${gOAuth.userProfile.jobs}</td>
                </tr>
                <tr>
                    <td class="label-cell">Roles</td>
                    <td id="roleCell" class="label-cell">${roles.join("<br>")}</td>
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