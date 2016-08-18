var decored, control_image, R2D, active, angle, center, init, rotate, rotation, start, startAngle, stop, target, once;

document.addEventListener('BindURL', function(e) {
    control_image = e.detail;
})

function readiness_check() {
    var view_load = false;
    if (typeof window.stManager == 'undefined') {
        window.setTimeout(function() { readiness_check() }, 10);
    } else if (typeof window.Videoview == 'undefined' && !view_load) {
        stManager.add('videoview.js');
        view_load = true;
        window.setTimeout(function() { readiness_check() }, 10);
    } else if (typeof window.Videoview == 'undefined') {
        window.setTimeout(function() { readiness_check() }, 10);
    } else {
        cloned_function = Videoview.buildLayerContent;
        Videoview.buildLayerContent = function() {
            cloned_function();
            draw_control();
        }
    };
};

function draw_control() {
    var control = document.createElement('div');
    control.id = 'propeller';
    control.className = 'mv_top_button mv_top_close';
    control.style.backgroundImage = 'url(' + control_image + ')';
    origin = '<div class="mv_toggle_sideblock_icon"></div>          </div>        </div>';
    with_control = '<div class="mv_toggle_sideblock_icon"></div>          </div>' + control.outerHTML + '        </div>      </div>';
    val(mvLayer, val(mvLayer).replace(origin, with_control));
    init_rotation();
}

document.ontouchmove = function(e) {
    return e.preventDefault();
};

function init_rotation() {
    decored = false;
    active = false;
    angle = 0;
    rotation = 0;
    startAngle = 0;
    center = {
        x: 0,
        y: 0
    };
    R2D = 180 / Math.PI;
    target = document.getElementById('mv_main');
    target.style.zIndex = '9';
    control = document.getElementById('propeller');
    control.addEventListener('mousedown', start, false);
    document.addEventListener('mousemove', rotate, false);
    document.addEventListener('mouseup', stop, false);
};

function start(e) {
    var height, left, ref, top, width, x, y;
    e.preventDefault();
    ref = target.getBoundingClientRect(), top = ref.top, left = ref.left, height = ref.height, width = ref.width;
    center = {
        x: left + (width / 2),
        y: top + (height / 2)
    };
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    active = true;
};

function rotate(e) {
    if (active) {
        var d, x, y;
        e.preventDefault();
        x = e.clientX - center.x;
        y = e.clientY - center.y;
        d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;
        target.style.transform = 'rotate(' + (angle + rotation) + 'deg)';
    }
};

function stop() {
    angle += rotation;
    active = false;
};

readiness_check();