/* ** **
TUTTE LE PAGINE
Visualizza il pulsante "scroll-to-top" quando lo scroll supera
l'altezza impostata e al click lo porta all'inizio della pagina
** ** */
var btnScrollToTop = document.getElementById('scrollToTop');
var scrollHeight = 1000;
window.onscroll = function () {
    if (btnScrollToTop) {
        scrollFunc();
    }
};
// Definisco la funzione
function scrollFunc() {
    if (
        document.body.scrollTop > scrollHeight ||
        document.documentElement.scrollTop > scrollHeight
    ) {
        btnScrollToTop.style.display = 'block';
    } else {
        btnScrollToTop.style.display = 'none';
    }
}

if (btnScrollToTop) {
    // Definisco il click del pulsante
    btnScrollToTop.addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

/* DISMISS ALERT */
// setTimeout(function () {
//     $('.alert').alert('close')
// }, 3000);

/* ** **
PAGINE MODIFICA CONTENUTO
Visualizza il form per la modifica del Titolo o della Descrizione.
Show form -> Hidden text
Hidden form -> Show text
** ** */
var titleForm = $('#titleForm');
var descriptionForm = $('#descriptionForm');
var contentTitle = $('#contentTitle');
var contentDescription = $('#contentDescription');
var btnEditTitle = $('#contentTitle button');
var btnEditDescription = $('#contentDescription button');

var btnCloseForm = $("#contentForm button[type='button'], .cancel_button");

// Show/Hidden elements function
if (btnEditTitle.length > 0) {
    btnEditTitle.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        contentTitle.removeClass('d-flex').addClass('d-none');

        $('#title_field').removeClass('d-none');
        $('#buttons_field').toggleClass('d-none');

        titleForm.css('display', 'flex').addClass('active');
        btnEditDescription.attr('disabled', true);
    });
}
if (btnEditDescription.length > 0) {
    btnEditDescription.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        contentDescription.removeClass('d-flex').addClass('d-none');

        $('#desc_field').toggleClass('d-none');
        //$('#buttons_field').toggleClass('d-none')

        //titleForm.css('display', 'flex').addClass('active')
        btnEditTitle.attr('disabled', true);
    });
}

if (btnCloseForm.length > 0) {
    btnCloseForm.on('click', function () {
        contentTitle.addClass('d-flex').removeClass('d-none');
        contentDescription.addClass('d-flex').removeClass('d-none');

        $('#title_field:not(.d-none)').addClass('d-none');
        $('#desc_field:not(.d-none)').addClass('d-none');

        btnEditDescription.attr('disabled', false);
        btnEditTitle.attr('disabled', false);
    });
}

/* ** **
PAGINE MODIFICA CONTENUTO
Visualizza il form per la modifica del Titolo o della Descrizione.
Show form -> Hidden text
Hidden form -> Show text
** ** */
// var contentForm = $("#contentForm")
// var textContent = $("#textContent")
// var btnEditContent = $("#textContent button")
// var btnCloseForm = $("#contentForm button[type='button']")
// // Show/Hidden elements function
// if (btnEditContent.length > 0) {
//     btnEditContent.on('click', function(){
//         textContent.css('display', 'none')
//         contentForm.css('display', 'block')
//     })
// }
// if (btnCloseForm.length > 0) {
//     btnCloseForm.on('click', function () {
//         contentForm.css('display', 'none')
//         textContent.css('display', 'flex')
//     })
// }

function checkFromValidity(form, event) {
    is_valid = true;
    console.log('FORM', form);
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();

        setTimeout(function () {
            $(form).find('*:invalid')[0].scrollIntoView({ behavior: 'smooth' });
        }, 100);
        is_valid = false;
    }
    form.classList.add('was-validated');
    return is_valid;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
$(document).ready(function () {
    // var table = $('#projects_table').DataTable({
    //      "searching": false,
    //      "paging": false
    // });

    // table.order( [
    //     [ 0, 'asc' ],
    //     [ 1, 'asc' ],
    //     [ 2, 'asc' ],
    //     [ 3, 'asc' ],

    // ] ).draw();

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
            'submit',
            function (event) {
                checkFromValidity(form, event);
            },
            false
        );
    });

    $('#deleteItemModal, #addItemModal, #addModal, #kml_modal').on(
        'show.bs.modal',
        function (e) {
            //e.preventDefault();
            //ajax call here!!
            console.log('AJAX!');
            var button = $(e.relatedTarget);
            var that = $(this);

            console.log('FIRE1', button.data('cur_map'));

            var data_cur_map = button.data('cur_map');

            if (data_cur_map) {
                that.data('cur_map', data_cur_map);
            } else {
                that.removeData('cur_map');
            }

            var iskmlcreate = button.data('iskmlcreate');
            if (iskmlcreate) {
                that.data('iskmlcreate', data_cur_map);
            } else {
                that.removeData('iskmlcreate');
            }

            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            var create_date = dd + '/' + mm + '/' + yyyy;

            var create_title = 'Itinerario ' + create_date;
            var create_done_by = 'Rilevatore provvisorio';

            if (iskmlcreate) {
                tmp_title = $('#main_itinerary_form #id_title').val();
                console.log('tmp_title', tmp_title);
                if (tmp_title.length > 0) {
                    console.log('tmp_title', tmp_title);
                    create_title = tmp_title;
                }
                tmp_done = $('#main_itinerary_form #id_done_by').val();
                if (tmp_done.length > 0) {
                    create_done_by = tmp_done;
                }
                tmp_date = $('#main_itinerary_form #id_date').val();
                if (tmp_date.length > 0) {
                    create_date = tmp_date;
                }
            }

            var url = button.attr('href');
            var is_global = false;
            //button.attr('data-global')
            if (button[0].hasAttribute('data-global')) {
                is_global = button.attr('data-global') == 'true';
            }
            console.log('iskmlcreate', iskmlcreate);
            console.log('is_global', is_global);

            $.ajax({
                url: url,
            }).done(function (html) {
                html_res = $(html);
                if (html_res.find('#loginForm').length > 0) {
                    console.log('html 2');
                    location.href = '/manage/login.htm';
                } else {
                    console.log('html 3');
                    that.find('.modal-body').html(html_res.find('.modal-body').html());
                    that.find('#addItemModalTitle').html(html_res.find('h1').html());
                    that.find('form').attr('data-global', is_global);
                    if (data_cur_map) {
                        console.log('FIRE1', data_cur_map);
                        that.find('form').data('cur_map', data_cur_map);
                    }
                    if (iskmlcreate) {
                        console.log('create_title'), create_title;
                        that.find('#id_title').val(create_title);
                        that.find('#id_date').val(create_date);
                        that.find('#id_done_by').val(create_done_by);
                    }
                }
            });
        }
    );

    $('#addItemModal, #deleteItemModal, #addModal, #kml_modal').on(
        'hidden.bs.modal',
        function () {
            console.log('ppppp');
            $(this)
                .find('.modal-body')
                .html(
                    '<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>'
                );
        }
    );

    $('body').on(
        'submit',
        '.modal form:not(#klm):not(#permissions_form)',
        function (e) {
            console.log('EEEE');
            //event.preventDefault();

            var that = $(this);

            is_valid = checkFromValidity(this, e);

            var is_global = false;
            //button.attr('data-global')
            if (that[0].hasAttribute('data-global')) {
                is_global = that.attr('data-global') == 'true';
            }
            //is_global = that.attr('data-global')
            console.log('is_global_2', is_global);

            if (is_valid) {
                if (is_global) {
                    return true;
                } else {
                    var modal = that.parents('.modal');

                    console.log('EEEE', that.find(':input').serialize());
                    $.ajax({
                        url: that.attr('action'),
                        type: 'POST',
                        data: that.find(':input').serialize(),
                    }).done(function (html) {
                        var html_res = $(html);
                        var main_itinerary_form = html_res.find('#main_itinerary_form');
                        var pluri_table = html_res.find('#pluri_table');

                        if (
                            main_itinerary_form.length > 0 &&
                            main_itinerary_form.data('pageurl') &&
                            pluri_table.length == 0
                        ) {
                            location.href = main_itinerary_form.data('pageurl');
                        } else if (
                            html_res.find(
                                '#projects_table, #projectContent, #pluri_table'
                            ).length > 0
                        ) {
                            var selected_tab =
                                $('.nav-link.active').removeClass('active');
                            $('#projects_table').html(
                                html_res.find('#projects_table').html()
                            );
                            $('#projectContent').html(
                                html_res.find('#projectContent').html()
                            );
                            $('#pluri_table').html(
                                html_res.find('#pluri_table').html()
                            );
                            $('#messages_conatiner').html(
                                html_res.find('#messages_conatiner').html()
                            );
                            $('.modal').modal('hide');
                            console.log('active', selected_tab.length);
                            if (selected_tab.length > 0) {
                                console.log(selected_tab.attr('id'));
                                $('#' + selected_tab.attr('id')).tab('show');
                            }
                        } else if (html_res.find('#loginForm').lengt > 0) {
                            console.log('html 2c');
                            location.href = '/manage/login.htm';
                        } else {
                            console.log('html 3c');

                            modal
                                .find('.modal-body')
                                .html(html_res.find('.modal-body').html());
                        }
                    });
                }
            }
            return false;
        }
    );

    $('body').on('submit', '.modal #klm', function (e) {
        console.log('klm');
        //event.preventDefault();

        var that = $(this);

        is_valid = checkFromValidity(this, e);

        if (is_valid) {
            var modal = that.parents('.modal');

            var data_cur_map = modal.data('cur_map');
            var iskmlcreate = modal.data('iskmlcreate');

            var formData = new FormData(this);

            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (html, textStatus, jqXHR) {
                    var html_res = $(html);
                    var klm_form = html_res.find('#klm');

                    if (klm_form.length > 0) {
                        that.find('.modal-body').html(
                            html_res.find('.modal-body').html()
                        );
                        that.find('#addItemModalTitle').html(
                            html_res.find('h1').html()
                        );
                    } else {
                        var page_form = html_res.find('#main_itinerary_form');
                        var main_itinerary_form = $('#main_itinerary_form');

                        //RIMUOVO I CONTROLLI PER LA MODIFCA DEL TRACCIATO ALTRIMENTI SONO DUPLICATI
                        $('.leaflet-draw.leaflet-control.id_path').remove();
                        main_itinerary_form
                            .find('#id_path')
                            .val(page_form.find('#id_path').val());

                        if (iskmlcreate) {
                            new_url = page_form.attr('action');
                            main_itinerary_form.attr('action', new_url);

                            history.replaceState({}, '', new_url);

                            main_itinerary_form
                                .find('#id_title')
                                .val(page_form.find('#id_title').val());
                            main_itinerary_form
                                .find('#id_date')
                                .val(page_form.find('#id_date').val());
                            main_itinerary_form
                                .find('#id_done_by')
                                .val(page_form.find('#id_done_by').val());
                        }
                        data_cur_map.eachLayer(function (layer) {
                            if (!!layer.toGeoJSON) {
                                data_cur_map.removeLayer(layer);
                            }
                        });

                        geodjango_id_path.field_store_class = L.FieldStore;

                        new L.GeometryField(geodjango_id_path).addTo(data_cur_map);

                        reset_tratto_map(true);

                        $('.modal').modal('hide');

                        //location.replace(page_form.attr('action'));
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //if fails
                },
            });
        }
        return false;
    });

    $('body').on('click', 'th[data-order]', function (e) {
        that = $(this);
        order = that.data('order');

        order_versus = 'down';
        if (that.find('.fa-sort-down').length > 0) {
            order_versus = 'up';
        }

        location.href =
            location.pathname + '?order=' + order + '&order_versus=' + order_versus;
    });

    var date_input = $('#id_date');
    var lastdate_input = $('#id_last_date');

    if (date_input.length > 0 || lastdate_input.length > 0) {
        $.datetimepicker.setLocale('it');

        var today = new Date();
        var cur_year = today.getFullYear();
        var cur_month = today.getMonth();

        var maxDate = new Date(cur_year, cur_month + 1, 0);

        var date_picker_settings = {
            timepicker: false,
            format: 'd/m/Y',
            yearEnd: cur_year,
            maxDate: maxDate,
            scrollInput: false,
            scrollMonth: false,
            scrollTime: false,
        };
        if (date_input.length > 0) {
            date_input.datetimepicker(date_picker_settings);
        }
        if (lastdate_input.length > 0) {
            lastdate_input.datetimepicker(date_picker_settings);
        }
    }
});

$('body').on('change', '.custom-file-input:not(.alpaca)', function (e) {
    var fileName = $(this).val();
    var parent = $(this).parents('.custom-file');
    parent.prev('a').html(fileName);

    var reader = new FileReader();

    reader.onload = function (e) {
        parent.parent().next().attr('src', e.target.result);
    };

    reader.readAsDataURL(this.files[0]);
});

$('body').on('click', '#previewTab .nav-link', function (e) {
    var index = $(this).data('previewindex');

    $('#displayTab')
        .find('.nav-link')
        .each(function (counter) {
            var old_index = '_' + $(this).data('previewindex');

            $(this).attr(
                'href',
                $(this)
                    .attr('href')
                    .replace(old_index, '_' + index)
            );
            $(this).attr(
                'aria-controls',
                $(this)
                    .attr('aria-controls')
                    .replace(old_index, '_' + index)
            );
            $(this).data('previewindex', index);
        });
});

$('body').on('click', '#displayTab .nav-link', function (e) {
    var index = $(this).data('previewtab');

    $('#previewTab')
        .find('.nav-link')
        .each(function (counter) {
            var old_index = $(this).data('previewtab');

            $(this).attr('href', $(this).attr('href').replace(old_index, index));
            $(this).attr(
                'aria-controls',
                $(this).attr('aria-controls').replace(old_index, index)
            );
            $(this).data('previewtab', index);
        });
});

$(document).on('click', 'input.admindatewidget[readonly]', function (e) {
    $(this).next().find('span').click();
});

$(document).on('click', '.change_image, .image_preview', function (e) {
    e.stopPropagation();
    next_input = $(this).next().find("input[type='file']");
    if (next_input.length > 0) {
        $(this).next().find("input[type='file']").trigger('click');
    } else {
        $(this)
            .closest('.image_preview')
            .next()
            .find("input[type='file']")
            .trigger('click');
    }
});

$(document).on('click', '.clear_image', function (e) {
    e.stopPropagation();
    var input = $(this).closest('.image_preview').next().find("input[type='file']");
    input.val('');
    alpaca_field = Alpaca.fieldInstances[input.attr('id')];
    var old_value = alpaca_field.data;
    console.log('old_value 2', old_value);
    alpaca_field.data = changeFilePreview(alpaca_field.field, [], [], old_value);

    //CLEAR DIDASCALIA

    $(this).closest('.alpaca-container-item').next().find("input[type='text']").val('');
});

function changeFilePreview(field, files, data, old_value) {
    var img_prev = field.find('.image_preview');
    if (img_prev.find('img').length > 0) {
        img_prev.find('img').remove();
    }
    if (data[0]) {
        var img_string = "<img src='" + data[0] + "'>";
        if (img_prev.find('.images_action').length == 0) {
            img_string +=
                '<div class=\'images_action d-flex justify-content-around align-items-center\'><button class="mr-3 change_image" type="button"><i class="fal fa-image-polaroid"></i><br/>Cambia foto</button><button class="clear_image" type="button"><i class="fas fa-trash"></i><br/>Cancella foto</button></div><div class="no_preview d-none"><i class="fas fa-plus-circle" aria-hidden="true"></i><br/>Aggiungi foto</div>';
        }

        img_prev.prepend(img_string);
        field
            .find('.no_image_loaded')
            .removeClass('no_image_loaded')
            .addClass('image_loaded');
        field.find('.no_preview').addClass('d-none');
    } else {
        field
            .find('.image_loaded')
            .removeClass('image_loaded')
            .addClass('no_image_loaded');
        field.find('.no_preview').removeClass('d-none');
    }

    console.log('old_value', old_value);
    console.log('old_value file', files);

    var cur_data = {};

    if (files.length > 0) {
        cur_data['newFile'] = files[0].name;
    } else {
        cur_data['newFile'] = '';
    }

    if (old_value && typeof old_value === 'object' && 'oldFile' in old_value) {
        cur_data['oldFile'] = old_value.oldFile;
    } else if (old_value && typeof old_value !== 'object') {
        cur_data['oldFile'] = old_value;
    } else {
        cur_data['oldFile'] = null;
    }

    if (data && data.length > 0) {
        cur_data['blob'] = data[0];
    } else {
        cur_data['blob'] = '';
    }

    // if (old_value && old_value.oldFile && files[0]) {
    //     console.log('old_valueA');
    //     data = {
    //         oldFile: old_value.oldFile,
    //         newFile: files[0].name,
    //         blob: data[0],
    //     };
    // } else if (files[0]) {
    //     console.log('old_valueB');
    //     data = {
    //         oldFile: null,
    //         newFile: files[0].name,
    //         blob: data[0],
    //     };
    // } else if (old_value && old_value.oldFile && files.length == 0) {
    //     console.log('old_valueC');
    //     data = {
    //         oldFile: old_value.oldFile,
    //         newFile: '',
    //         blob: '',
    //     };
    // } else {
    //     console.log('old_valueD');
    //     data = {
    //         oldFile: old_value,
    //         newFile: '',
    //         blob: '',
    //     };
    // }
    console.log('old_valueAfter', cur_data);
    return cur_data;
}

function validateDidascalia(field) {
    parent_field = field.parent;
    image_field = parent_field.childrenByPropertyId['foto'];
    validation_status = null;
    console.log('image_field.data', image_field.data);
    if (image_field.data && image_field.data.newFile != '' && field.getValue() == '') {
        validation_status = {
            status: false,
            message: 'Inserisci una didascalia',
        };
    } else {
        validation_status = {
            status: true,
        };
    }
    return validation_status;
}
