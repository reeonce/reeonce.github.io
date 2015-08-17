/*jslint browser: true white: true */
/*global $, console, Two */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-65501306-1', 'auto');
ga('send', 'pageview');


// http://blog.westleyargentum.com/monsters/
(function() {
    var root = this;

    var Engine = root.Engine = {
        entities: [],
        namedEntities: {},
        levels: {},
        level: null
    };

    Engine.clear = function() {
        Engine.entities = [];
        Engine.namedEntities = {};
        Engine.level = null;
    };

    Engine.addEntity = function(entity, name) {
        Engine.entities.push(entity);
        if (name) {
            Engine.namedEntities[name] = entity;
        }
    };

    Engine.getEntity = function(name) {
        return Engine.namedEntities[name];
    };

    Engine.addLevel = function(name, fn) {
        Engine.levels[name] = fn;
    };

    Engine.loadLevel = function(two, name) {
        var level = Engine.levels[name];
        if (level != null) {
            Engine.clear();
            two.clear();

            Engine.level = new level(two);
        }
    };

}());

(function () {
    var root = this;

    var MONSTER_MORPH_EPSILON = 0.02,
        MONSTER_MORPH_RATE = 0.0125,
        MONSTER_PFFF_RATE = 0.125,
        MONSTER_BASE_SIZE = 120,
        MONSTER_BASE_EYE_OUTER = 24,
        MONSTER_BASE_EYE_INNER = 13,
        MONSTER_EYE_WANDER_SPEED = 0.125,
        MONSTER_EYE_WANDER_RANGE = 7,
        MONSTER_EYE_WANDER_CHANCE = 0.009;

    var SquishyMonster = root.SquishyMonster = function (two, x, y) {
        this.blob = two.makeCircle(0, 0, MONSTER_BASE_SIZE);
        this.blob.fill = 'gray';
        this.blob.noStroke();

        this.rightEye = createEye(two, 30, 0);
        this.leftEye = createEye(two, -30, 0);

        this.whole = two.makeGroup(this.blob, this.rightEye, this.leftEye);
        this.whole.translation.set(x, y);

        this.rightEye.destination = new Two.Vector();
        this.leftEye.destination = new Two.Vector();

        this.animationTime = -1.0;
        this.animationFn = null;
    };

    SquishyMonster.prototype.update = function (time) {
        if (this.animationTime <= 0.0) {
            if (Math.random() < 0.1) {
                this.goPfff(this, time);
            } else {
                this.idleSquishy(this, time);
            }
        } else {
            this.animationTime -= time;
            this.animationFn(this, time);
        }
    };

    SquishyMonster.prototype.goPfff = function () {
        this.animationFn = updateGoPfff;
        this.animationTime = Math.random() * 6 + 4;

        var blob = this.blob,
            i;
        for (i = 0; i < blob.vertices.length; i++) {
            var theta = (i + 1) / blob.vertices.length * Math.PI * 2,
                x = MONSTER_BASE_SIZE * Math.cos(theta),
                y = MONSTER_BASE_SIZE * Math.sin(theta);

            blob.vertices[i].destination = new Two.Vector(x, y);
        }

        this.rightEye.destination = new Two.Vector();
        this.leftEye.destination = new Two.Vector();
    };

    SquishyMonster.prototype.idleSquishy = function() {
        randBodyDestinations(this.blob);
        this.animationFn = updateIdleSquishy;
        this.animationTime = Math.random() * 10 + 4;
    };

    // *******

    function updateGoPfff(monster, time) {
        var i;
        for (i = 0; i < monster.blob.vertices.length; i++) {
            var v = monster.blob.vertices[i];
            var d = v.destination;

            v.x += (d.x - v.x) * MONSTER_PFFF_RATE;
            v.y += (d.y - v.y) * MONSTER_PFFF_RATE;
        }

        updateEyes(monster, time);
    }

    function updateIdleSquishy(monster, time) {
        var i;
        for (i = 0; i < monster.blob.vertices.length; i++) {
            var v = monster.blob.vertices[i];
            var d = v.destination;

            if (v.distanceTo(d) < MONSTER_MORPH_EPSILON) {
                v.destination = randBodyDestination(monster.blob, i);
                continue;
            }

            v.x += (d.x - v.x) * MONSTER_MORPH_RATE;
            v.y += (d.y - v.y) * MONSTER_MORPH_RATE;
        }

        if (Math.random() < MONSTER_EYE_WANDER_CHANCE) {
            randEyeDestination(this);
        }

        updateEyes(monster, time);
    }

    function randEyeDestination(monster) {
        var randX = Math.random() * (Math.random() > 0.5 ? 1 : -1),
            randY = Math.random() * (Math.random() > 0.5 ? 1 : -1),
            dest = new Two.Vector(randX * MONSTER_EYE_WANDER_RANGE, randY * MONSTER_EYE_WANDER_RANGE);

        monster.rightEye.destination = dest;
        monster.leftEye.destination = dest;
    }

    function updateEyes(monster, time) {
        var eyePos = monster.rightEye.inner.translation,
            eyeDest = monster.rightEye.destination;

        monster.rightEye.inner.translation.x += (eyeDest.x - eyePos.x) * MONSTER_EYE_WANDER_SPEED;
        monster.rightEye.inner.translation.y += (eyeDest.y - eyePos.y) * MONSTER_EYE_WANDER_SPEED;

        eyePos = monster.leftEye.inner.translation;
        eyeDest = monster.leftEye.destination;

        monster.leftEye.inner.translation.x += (eyeDest.x - eyePos.x) * MONSTER_EYE_WANDER_SPEED;
        monster.leftEye.inner.translation.y += (eyeDest.y - eyePos.y) * MONSTER_EYE_WANDER_SPEED;
    }

    function createEye(two, x, y) {
        var eyeOuter = two.makeCircle(0, 0, MONSTER_BASE_EYE_OUTER);
        eyeOuter.fill = 'white';
        eyeOuter.noStroke();

        var eyeInner = two.makeCircle(0, 0, MONSTER_BASE_EYE_INNER);
        eyeInner.fill = 'black';

        var eye = two.makeGroup(eyeOuter, eyeInner);
        eye.inner = eyeInner;
        eye.translation.set(x, y);

        return eye;
    }

    function scaleEye(eye, scaleOuter, scaleInner) {

    }

    function randBodyDestination(blob, i) {
        var pct = (i + 1) / blob.vertices.length;
        var theta = pct * Math.PI * 2;
        var radius = Math.max(Math.random(), 0.4) * MONSTER_BASE_SIZE;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta);
        return new Two.Vector(x, y);
    }

    function randBodyDestinations(blob) {
        var i;
        for (i = 0; i < blob.vertices.length; i++) {
            var v = blob.vertices[i];
            v.destination = new randBodyDestination(blob, i);
        }
    }

}());

(function (){
    var root = this;

    var AbstractLand = root.AbstractLand = function(two) {
        var land = new Land(two);
        Engine.addEntity(land, 'abstractLand');

        var monster = new SquishyMonster(two, two.width / 4.0 * 3, two.height / 2.0);
        Engine.addEntity(monster, 'monster1');

        var monster2 = new SquishyMonster(two, two.width / 4.0, two.height / 3.0);
        Engine.addEntity(monster2, 'monster2');

        // secret key press to make monsters go PFFF
        $(document).bind('keypress', function(e) {
            var code = e.keyCode || e.which;
            switch(code) {
                case 'F'.charCodeAt():
                    monster.goPfff();
                    monster2.goPfff();
                    break;
            }
        });
    };

    var Land = function(two) {
        this.land = two.makeRectangle(two.width / 2.0, two.height / 2.0, two.width, two.height);
        this.land.fill = '#dfdfdf';
        this.land.linewidth = 0;
    };

    Land.prototype.update = function() {
    };

}());

(function () {
    var root = this;
    var Cube = root.Cube = function(left, top, length) {
        this.left = left;
        this.top = top;
        this.length = length;
        this.id = Math.floor(Math.random() * 100000);
    }

    Cube.prototype.render = function(container) {
        if ($('#cube-' + this.id).length > 0) {
            $('#cube-' + this.id).remove();
        }
        var cube, aspects = [];
        var cube = $('<div/>', {
            id: 'cube-' + this.id,
            class: 'cube animated infinite'
        });
        cube.width(this.length);
        cube.height(this.length);
        cube.css('position', 'absolute');
        cube.css('left', this.left + 'px');
        cube.css('top', this.top + 'px');

        for(var i=0; i<6; i++) {
            var aspect = $('<div/>', {
                class: 'aspect'
            });
            aspects.push(aspect);
            aspect.appendTo(cube);
        }
        function setTransform(ele, value) {
            ele.css('transform', value);
            ele.css('-webkit-transform', value);
            ele.css('-moz-transform', value);
            ele.css('-ms-transform', value);
        }
        function setTransformOrigin(ele, value) {
            ele.css('transform-origin', value);
            ele.css('-webkit-transform-origin', value);
            ele.css('-moz-transform-origin', value);
            ele.css('-ms-transform-origin', value);
        }
        var halfLen = this.length / 2;
        setTransform(aspects[0], 'translateZ(' + halfLen + 'px)');
        setTransform(aspects[1], 'translateZ(' + -halfLen + 'px)');
        setTransform(aspects[2], 'translateZ(' + halfLen + 'px) rotateX(-90deg)');
        setTransformOrigin(aspects[2], 'top');
        setTransform(aspects[3], 'translateZ(' + halfLen + 'px) rotateX(90deg)');
        setTransformOrigin(aspects[3], 'bottom');
        setTransform(aspects[4], 'translateZ(' + halfLen + 'px) rotateY(90deg)');
        setTransformOrigin(aspects[4], 'left');
        setTransform(aspects[5], 'translateZ(' + halfLen + 'px) rotateY(-90deg)');
        setTransformOrigin(aspects[5], 'right');

        cube.appendTo(container);
        setTimeout(function () {
            cube.toggleClass('rotation');
        }, Math.random() * 5000);
    }
} ());

$(document).ready(function () {
    'use strict';
    var contentHeight = $(".page-content").height();
    $(".site-nav").css("max-height", contentHeight);

    Two.Resolution = 32;

    var world = $('#the-world :first-child')[0];
    var two = new Two({ width: $('#the-world').width(), height: $('#the-world').height() }).appendTo(world);

    // register levels here
    Engine.addLevel('AbstractLand', AbstractLand);

    // load the starting level
    Engine.loadLevel(two, 'AbstractLand');

    // shortcuts for jumping to particular levels
    $(document).bind('keypress', function(e) {
        var code = e.keyCode || e.which;
        var level;

        switch(code) {
            case 'a'.charCodeAt():
                level = 'AbstractLand';
                break;
        }

        level && Engine.loadLevel(two, level);
    });

    two.bind('update', function() {
        var time = two.timeDelta / 1000 || 1 / 60;
        for (var i = 0; i < Engine.entities.length; ++i) {
            Engine.entities[i].update(time);
        }

    }).play();

    var originWidth = $(window).width();
    $(window).resize(function() {
        var newWidth = $(window).width();
        if (originWidth !== newWidth) {
            originWidth = newWidth;
            two.width = $('#the-world').width();
            two.height = $('#the-world').height();
            Engine.loadLevel(two, 'AbstractLand');
        }
    });

    function setupCubes() {
        var cubes = [], timer, maxCubeCount = 6;
        var container = $('.cube-container');
        var xCount = Math.floor(container.width() / 360) || 1;
        var yCount = Math.floor(container.height() / 320) || 1;
        maxCubeCount = xCount * yCount;

        function createCube(rect) {
            var length = Math.floor(Math.random()*150) + 50;
            var left = Math.floor(Math.random() * (rect.width - length)) + rect.x;
            var topa = Math.floor(Math.random() * (rect.height - length)) + rect.y;
            var cube = new Cube(left, topa, length);
            cube.render(container);
            cubes.push(cube);
        }
        var currentRect = {
            x: 50,
            y: 50,
            width: container.width() / xCount,
            height: container.height() / xCount
        };
        createCube(currentRect);
        timer = setInterval(function () {
            currentRect.x = cubes.length % xCount * container.width() / xCount;
            if (cubes.length % xCount == 0) {
                currentRect.x += 50;
            } else if (cubes.length % xCount == xCount - 1) {
                currentRect.x -= 50;
            }
            currentRect.y = Math.floor(cubes.length / xCount) * container.height() / yCount;
            if (Math.floor(cubes.length / xCount) == 0) {
                currentRect.y += 50;
            }
            createCube(currentRect);

            if (cubes.length >= maxCubeCount) {
                clearInterval(timer);
            }
        }, 0);
    }
    $('body').append('<div class="cube-container"></div>');
    setTimeout(setupCubes, 0);

    $('.side-bar .menu-icon').click(function (e) {
        e.preventDefault();
        $('.side-bar .trigger').toggle();
    });
});
