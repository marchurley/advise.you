//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//GLOBAL VARIABLES
var advice = ["Testadvice1", "Testadvice2", "Testadvice3"];
var image = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];
var baseUrl = "http://localhost/adviseyou/adviseyou_backend/public/";
var authUrl = baseUrl + "api/v1/";
var currentUser = null;

//////////////////////////////////////////
//////////////////////////////////////////

//JQuery Prepare document
$(document).ready(function() {

  initializeTokenLogin();

  //arrays are in random order
  image = shuffle(image);
  //arrays serve the first entry
  image = serve(image);
  $("#overlayWindow, #adviceWindow, #reset, #sending, #sendingReset, #errorReset, #forgotPasswordRegister, #noAccountBack, #confirmEmail, #errorRegPassword, #errorRegEmail, #errorLogin, #transp").hide(); //HIDE OVERLAY ON LOAD
  //////////////////////////////////////////
  //SHOW BACKGROUND IMAGE
  $('.bg').css("background-image", "url(" + image + ")");
  //////////////////////////////////////////
  //
  //SHOW OVERLAY when + is clicked
  $("#activateOverlay").click(function() {
    $("#overlayWindow").show();
    $("#adviceWindow").hide();
    ajaxGetAllAdvice();
  });
  //////////////////////////////////////////
  //
  //HIDE OVERLAY when - is clicked
  $("#disableOverlay").click(function() {
    $("#overlayWindow").hide();
    $("#adviceWindow").show();
    ajaxGetRandomAdvice();
  });
  //////////////////////////////////////////
  //
  //POST ADVICE on CLICK
  $("#addAdviceSend").click(function() {
    var advice = $("#adviceSend").val();
    // var category = $("#categorySend").val();
    var priority = $("#prioritySend").val();
    if (advice.length === 0 && priority.length === 0) {
      alert("Please write down your advice and select a priority");
    // } else if (advice.length === 0 && priority.length === 0){
    //   alert("Please write down your advice and select a priority");
    // } else if (advice.length === 0 && category.length === 0){
    //   alert("Please write down your advice and select a category");
    // } else if (category.length === 0 && priority.length === 0){
    //   alert("Please select category and priority");
    // } else if (category.length === 0){
    //   alert("Please select a category");
    } else if (priority.length === 0){
      alert("Please select a priority");
    } else if (advice.length === 0){
      alert("Please select an advice");
    } else if (advice.length !== 0 && priority.length !== 0) {
      ajaxAddAdvice(advice, priority);
      $("#adviceSend").val('');
    }
  });
  //////////////////////////////////////////
  //
  //POST ADVICE on ENTER
  $("#addAdvice").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      var advice = $("#adviceSend").val();
      // var category = $("#categorySend").val();
      var priority = $("#prioritySend").val();
      if (advice.length === 0 && priority.length === 0) {
        alert("Please write down your advice and select a priority");
      // } else if (advice.length === 0 && priority.length === 0){
      //   alert("Please write down your advice and select a priority");
      // } else if (advice.length === 0 && category.length === 0){
      //   alert("Please write down your advice and select a category");
      // } else if (category.length === 0 && priority.length === 0){
      //   alert("Please select category and priority");
      // } else if (category.length === 0){
      //   alert("Please select a category");
      } else if (priority.length === 0){
        alert("Please select a priority");
      } else if (advice.length === 0){
        alert("Please select an advice");
      } else if (advice.length !== 0 && priority.length !== 0) {
        ajaxAddAdvice(advice, priority);
        $("#adviceSend").val('');
      }
    }
  });
  //////////////////////////////////////////
  //OPEN POPUP on CLICK
  // $('#addCategory').on('click', function() {
  //   if ($(this).hasClass('selected')) {
  //     deselect($(this));
  //   } else {
  //     $(this).addClass('selected');
  //     $('.pop').slideFadeToggle();
  //   }
  // });
  //////////////////////////////////////////
  // //ADD CATEGORY on CLICK
  // $("#sendCategory").click(function() {
  //   var category = $("#newCategory").val();
  //   $("#newCategory").val('');
  //   ajaxAddCategory(category);
  //   $("#displayNewCat").text(category + " was added");
  // });
  //////////////////////////////////////////
  //ADD CATEGORY on ENTER
  // $("#newCategory").keypress(function(event) {
  //   var category = $("#newCategory").val();
  //   if (event.which == 13) {
  //     event.preventDefault();
  //     $("#newCategory").val('');
  //     ajaxAddCategory(category);
  //     $("#displayNewCat").text(category + " was added");
  //   }
  // });
  //////////////////////////////////////////
  //CLOSE POPUP on CLICK
  // $('#closeNewCat').on('click', function() {
  //   $("#displayNewCat").text('');
  //   if ($(this).hasClass('!selected')) {
  //     deselect($(this));
  //   } else {
  //     $(this).addClass('!selected');
  //     $('.pop').slideFadeToggle();
  //   }
  // });
  //////////////////////////////////////////
  //CLOSE POPUP on ESC
  // $('.pop').keyup(function(e) {
  //   if (e.keyCode === 27) {
  //     $('#closeNewCat').click();
  //     $('#newCategory').val('');
  //   }
  // });
  //////////////////////////////////////////
  //FORGET PASSWORD IS CLICKED
  $("#forgotPassword, #forgotPasswordRegister").on('click', function(e) {
    e.preventDefault();
    $("#createAccount, #login").hide();
    $("#reset").show();
    $("#errorRegPassword, #errorRegEmail, #errorLogin, #forgotPasswordRegister").hide();
    $("#email, #password, #createEmail, #choosePassword").val("");
  });
  //////////////////////////////////////////
  //BACK
  $("#back, #noAccountBack").on('click', function(e) {
    e.preventDefault();
    $("#reset").hide();
    $("#createAccount, #login, #resetEmail, #reset-button").show();
    $("#noAccountBack, #errorReset").hide();
    $("#resetEmail").val("");

  });
  //////////////////////////////////////////
  //REGISTER
  $("#register-button").on('click', function(e) {
    e.preventDefault();
    $("#errorRegPassword, #errorRegEmail").hide();
    var email = $("#createEmail").val();
    var password = $("#choosePassword").val();
    if (!isValidEmailAddress(email)) {
      $("#errorRegEmail").show().text("Please use a valid email");
    }
    if (password.length < 6) {
      $("#errorRegPassword").show();
    }
    if (isValidEmailAddress(email) && password.length >= 6) {
      $("#errorRegPassword, #errorRegEmail").hide();
      ajaxPostRegister(email, password);
    }
  });
  //////////////////////////////////////////
  //LOGIN
  $("#login-button").on('click', function(e) {
    e.preventDefault();
    $("#errorLogin").hide().text("Email/Password not found");
    var email = $("#email").val();
    var password = $("#password").val();
    if (!isValidEmailAddress(email)) {
      $("#errorLogin").show().text("Please use a valid email");
    } else if (password.length < 6) {
      $("#errorLogin").show().text("Password must be at least 6 characters");
    }
    if (isValidEmailAddress(email) && password.length >= 6) {
      $("#errorLogin").hide();
      ajaxPostLogin(email, password);
    }
  });
  //////////////////////////////////////////
  //RESET
  $("#reset-button").on('click', function(e) {
    e.preventDefault();
    var email = $("#resetEmail").val();
    $("#resetEmail").val("");
    $("#sendingReset").hide();
    if (!isValidEmailAddress(email)) {
      $("#errorReset").show().text("Please use a valid email");
    } else if (isValidEmailAddress(email)) {
      ajaxResetEmail(email);
    }
  });

  //
});


//
//INITIALIZE UPON LOGIN
//
function initializeTokenLogin() {

  if (localStorage.token) {
    $("#loginWindow").hide();
    $.ajaxSetup({
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'bearer ' + localStorage.token);
      }
    });

    $.get(authUrl + "me", function(res) {
      $("#adviceWindow").show();
      $("#bgwhite").hide();
      currentUser = res;
      ajaxGetRandomAdvice();
      $("#welcomeUser").html("Welcome, " + res.email);
    }).fail(function() {
      $("#adviceWindow").hide();
      $("#loginWindow").show();
      localStorage.token = "";
    });

    $('#logout').on('click', function() {
      $("#adviceWindow").hide();
      $("#errorRegPassword, #errorRegEmail, #errorLogin, #forgotPasswordRegister").hide();
      $("#createEmail, #choosePassword, #email, #password").val("");
      $("#loginWindow").show();
      localStorage.token = "";
    });
  } else {
    $("#bgwhite").hide();
  }
}

//
//REGISTER: GET AJAX REQUEST
//
function ajaxPostRegister(email, password) {
  $("#sending").show();
  $("#errorRegPassword, #errorRegEmail, #createForm, #forgotPasswordRegister").hide();
  $.ajax({
    type: 'POST',
    url: baseUrl + 'auth/register',
    data: {
      email: email,
      password: password,
    },
    dataType: "json",
    success: function(response) {
      $("#errorRegPassword, #errorRegEmail, #createForm, #forgotPasswordRegister, #sending").hide();
      $("#createEmail, #choosePassword").val("");
      $("#confirmEmail").show();
    },
    error: function(response) {
      $("#errorRegEmail").show().text(response.responseJSON.email[0]);
      $("#forgotPasswordRegister, #createForm, #errorRegEmail").show();
      $("#sending").hide();
      $("#createEmail").val("");
      $("#choosePassword").val("");
    }
  });
}

//////////////////////////////////////////
//
//LOGIN: POST AJAX REQUEST
//
function ajaxPostLogin(email, password) {
  $.ajax({
    type: 'POST',
    url: baseUrl + 'auth/login',
    data: {
      email: email,
      password: password,
    },
    dataType: "json",
    success: function(response) {
      console.log(response);
      localStorage.token = response.token;
      $("#loginWindow").hide();
      $("#adviceWindow").show();
      initializeTokenLogin();
    },
    error: function(response) {
      console.log(response);
      $("#errorLogin").show();
    }
  });
}

//////////////////////////////////////////
//
//RESET: POST AJAX REQUEST
//
function ajaxResetEmail(email) {
  $("#sendingReset").show();
  $("#resetForm").hide();
  $.ajax({
    type: 'POST',
    url: baseUrl + 'password/email',
    data: {
      email: email,
    },
    dataType: "json",
    success: function(response) {
      $("#sendingReset").hide();
      $("#resetForm").show();
      $("#resetEmail, #reset-button").hide();
      $("#errorReset").show().html(response.msg);
      if (response.success === 0) {
        $("#noAccountBack").show();
      }
    },
    error: function(response) {
      $("#sendingReset").hide();
      $("#resetEmail, #reset-button").hide();
      $("#errorReset").show().html(response.msg);
    }
  });
}


//////////////////////////////////////////
//
//RANDOM ADVICE: GET AJAX REQUEST
//
function ajaxGetRandomAdvice() {
  $.ajax({
    type: 'GET',
    url: authUrl + 'advice',
    dataType: "json",
    success: function(response) {
      if (response.length === 0) {
        $("#advice").css("font-size", "80px");
        $("#advice").html("To create your first advice, click on the '+' in the top right corner!");
      } else {
        var advice = [];
        $.each(response, function(i) {
          advice.push(response[i].advice);
        });
        var choosenAdvice = shuffle(advice); // array in random order
        choosenAdvice = serve(advice); //array serve first entry
        var adviceLength = choosenAdvice.length;
        if (adviceLength > 20) {
          $("#advice").css("font-size", "60px");
          $("#advice").html(choosenAdvice);
        }
        if (adviceLength > 50) {
          $("#advice").css("font-size", "80px");
          $("#advice").html(choosenAdvice);
        }
        if (adviceLength > 100) {
          $("#advice").css("font-size", "40px");
          $("#advice").html(choosenAdvice);
        } else {
          $("#advice").html(choosenAdvice); // show advice
        }
      }
    },
    error: function(response) {
      console.log(response);
    }
  });
}
//////////////////////////////////////////
//
//ALL ADVICE: GET AJAX REQUEST
//
function ajaxGetAllAdvice() {
  $.ajax({
    type: 'GET',
    url: authUrl + 'advice',
    dataType: "json",
    success: function(response) {
      $.get(authUrl + "init", function(init) {
        loadAdvice(response, init);
      });
    },
    error: function(response) {
      alert(response);
    }
  });
}
//////////////////////////////////////////
//
//DISPLAY & EDIT GET REQUEST
//
function loadAdvice(data, init) {
  $('#showAdvice, #prioritySend').empty(); //clear all advice, category & priority
  // $("#categorySend").empty();
  var initPriority = init.Priorities;
  var priorityOption = '<option value="">Select a Priority</option>';
  for (var i = 0; i < initPriority.length; i++) {
    priorityOption += '<option value="' + initPriority[i] + '">' + initPriority[i] + '</option>';
  }
  $('#prioritySend').append(priorityOption);

  // var initCategories = init.Categories;
  // var categoryOption = '<option value="">Select a Category</option>';
  // for (var x = 0; x < initCategories.length; x++) {
  //   categoryOption += '<option value="' + initCategories[x] + '">' + initCategories[x] + '</option>';
  // }
  // $('#categorySend').append(categoryOption);

  $.each(data, function(i) {
    //Show all advice in DOM
    var advice = '<td class="editable blue" id="adviceId' + data[i].id + '">' + data[i].advice + '</td>';
    // var categoryId = '<td class="editable" id="categoryId' + data[i].id + '">' + data[i].category_id + '</td>';
    var priority = '<td class="editable" id="priorityId' + data[i].id + '">' + data[i].priority + '</td>';
    var edit = '<td class="!hide cursor" id="editId' + data[i].id + '">edit</td>';
    var save = '<td class="hide cursor" id="saveId' + data[i].id + '">save</td>';
    var deleteAdvice = '<td class="!hide cursor" id="deleteId' + data[i].id + '">delete</td>';
    var escapeEdit = '<td class="hide cursor" id="escapeId' + data[i].id + '">esc</td>';
    var row = '<tr id="rowId' + data[i].id + '">' + advice + priority + edit + save + deleteAdvice + escapeEdit + '</tr>';
    $('#showAdvice').append(row);
    var editButton = '#editId' + data[i].id;
    var saveButton = '#saveId' + data[i].id;
    var deleteButton = '#deleteId' + data[i].id;
    var escapeButton = '#escapeId' + data[i].id;
    var editAdvice = '#adviceId' + data[i].id;
    // var editCategoryId = '#categoryId' + data[i].id;
    var editPriority = '#priorityId' + data[i].id;
    var editRow = '#rowId' + data[i].id;
    //Edit advice when edit button is clicked
    $(editButton).on('click', function() {
      $(saveButton).toggleClass("hide");
      $(editButton).toggleClass("hide");
      $(deleteButton).toggleClass("hide");
      $(escapeButton).toggleClass("hide");
      $(editAdvice).attr('contentEditable', true).selectText();
      // $(editCategoryId).attr('contentEditable', true);
      $(editPriority).attr('contentEditable', true);
    });
    //
    $(".editable").on("focus", function() {
      $(this).selectText();
    });
    //
    $(saveButton).on('click', function() {
      $(saveButton).toggleClass("hide");
      $(editButton).toggleClass("hide");
      $(deleteButton).toggleClass("hide");
      $(escapeButton).toggleClass("hide");
      $(editAdvice).attr('contentEditable', false);
      // $(editCategoryId).attr('contentEditable', false);
      $(editPriority).attr('contentEditable', false);
      ajaxEditAdvice(data, i, init);
    });
    //
    $(editRow).keypress(function(e) {
      if (e.which == 13) { //Enter key pressed
        $(saveButton).click();
      }
    });
    //
    $(escapeButton).on('click', function() {
      $(saveButton).toggleClass("hide");
      $(editButton).toggleClass("hide");
      $(deleteButton).toggleClass("hide");
      $(escapeButton).toggleClass("hide");
      $(editAdvice).attr('contentEditable', false);
      // $(editCategoryId).attr('contentEditable', false);
      $(editPriority).attr('contentEditable', false);
      $(editAdvice).text(data[i].advice);
      // $(editCategoryId).text(data[i].category_id);
      $(editPriority).text(data[i].priority);
    });
    //
    //When escape pressen
    $(editRow).on('keyup', function(evt) {
      if (evt.keyCode == 27) {
        $(escapeButton).click();
      }
    });
    //DELETE
    $(deleteButton).on('click', function() {
      if (confirm("Are you sure?")) {
        ajaxDeleteAdvice(data, i);
        $(editRow).remove();
      }
      return false;
    });
  });
}
//////////////////////////////////////////
//
//POST AJAX REQUEST - ADD ADVICE
//
function ajaxAddAdvice(advice, priority) {
  $.ajax({
    type: 'POST',
    url: authUrl + 'advice',
    data: {
      'advice': advice,
      // 'category_id': category,
      'priority': priority
    },
    dataType: "json",
    success: function(response) {
      $("#transp").fadeIn(100);
      setTimeout(function() {
        $("#transp").fadeOut(100);
      }, 250);
      ajaxGetAllAdvice();
    },
    error: function(response) {
      console.log("error" + response);
    }
  });
}
//////////////////////////////////////////
//
//POST/ID AJAX REQUEST - EDIT ADVICE
//
function ajaxEditAdvice(data, i, init) {
  //Assign new advice content to variable
  var advice = $('#adviceId' + data[i].id).text();
  // var categoryId = $('#categoryId' + data[i].id).text();
  var priority = $('#priorityId' + data[i].id).text();
  if ($.isNumeric(priority) && priority <= 5 && priority > 0) {
    $.ajax({
      type: 'POST',
      url: authUrl + 'advice/' + data[i].id,
      data: {
        'advice': advice,
        // 'category_id': categoryId,
        'priority': priority
      },
      dataType: "json",
      success: function(response) {
        $("#transp").fadeIn(100);
        setTimeout(function() {
          $("#transp").fadeOut(100);
        }, 250);
      },
      error: function(response) {
        alert(response);
      }
    });
  } else {
    $.ajax({
      type: 'POST',
      url: authUrl + 'advice/' + data[i].id,
      data: {
        'advice': advice,
        // 'category_id': categoryId,
      },
      dataType: "json",
      success: function(response) {
        alert("Priority needs to be a number between 1 and 5");
        ajaxGetAllAdvice();
      },
      error: function(response) {
        alert("Priority needs to be a number between 1 and 5");
        ajaxGetAllAdvice();
      }
    });

  }
}
//////////////////////////////////////////
//
//DELETE AJAX REQUEST
//
function ajaxDeleteAdvice(data, i) {
  $.ajax({
    type: 'DELETE',
    url: authUrl + 'advice/' + data[i].id,
    dataType: "json",
    success: function(response) {
      $("#transp").fadeIn(100);
      setTimeout(function() {
        $("#transp").fadeOut(100);
      }, 250);
    },
    error: function(response) {}
  });

}
//////////////////////////////////////////
//
//POST CATEGORY REQUEST
//
// function ajaxAddCategory(category) {
//   console.log(category);
//   console.log("finish code: send to server");
//   ajaxGetAllAdvice();
// }
//////////////////////////////////////////
//
//DURSTENFELD SHUFFE
//
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
/////////////////////////////////////////
//
//SERVE IN ORDER
//
function serve(array) {
  for (var i = 0; i < array.length; i++) {
    return array[i];
  }
}
//////////////////////////////////////////
//
//SELECT/FOCUS TEXT CONTENTEDITABLE
//
jQuery.fn.selectText = function() {
  var doc = document;
  var element = this[0];
  if (doc.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
//////////////////////////////////////////
//
//SLIDE CATEGORY POPUP TOGGLE
//
// $.fn.slideFadeToggle = function(easing, callback) {
//   return this.animate({
//     opacity: 'toggle',
//     height: 'toggle'
//   }, 'fast', easing, callback);
// };
//
//DESELECT CATEGORY POPUP
//
// function deselect(e) {
//   $('.pop').slideFadeToggle(function() {
//     e.removeClass('selected');
//   });
// }
//
//CHECK IF VALID EMAILADDRESS
//
function isValidEmailAddress(emailAddress) {
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
}
