var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}console.clear();
var PI = Math.PI;
var PI2 = PI * 2;
var staticId = 0;var

Point = function () {
  function Point(_ref) {var x = _ref.x,y = _ref.y;_classCallCheck(this, Point);
    this.id = generateId();
    this.x = x;
    this.y = y;
    this.connection1 = null;
    this.connection2 = null;
  }_createClass(Point, [{ key: 'open', value: function open()





    {
      if (this.used()) return false;
      return this.connection1 ? 'connection2' : 'connection1';
    } }, { key: 'connect', value: function connect(

    id) {
      var open = this.open();
      if (open)
      this[open] = id;else

      console.warn('NOT OPEN YET ASSUMING IT IS');
    } }, { key: 'used', value: function used()

    {
      return this.connection1 !== null && this.connection2 !== null;
    } }, { key: 'relate', value: function relate(

    points, centerX, centerY) {var _this = this;
      this.proxC = Point.prox(this.x, this.y, centerX, centerY);
      this.preference = [];
      this.preferences = [];
      // set distance to this point
      points.forEach(function (point) {
        if (point.id !== _this.id) {
          var prox = Point.prox(_this.x, _this.y, point.x, point.y);
          // rounding proximity to a vector
          var vectorSize = 0.0625;
          var relProx = Math.round(prox / vectorSize) * vectorSize;
          // radial influence, normalized
          var rad = Math.atan2(_this.y - point.y, _this.x - point.x) * 180 / PI;
          var relRad = (rad + 180) / 360;
          relRad = Math.round(relRad / vectorSize) * vectorSize;
          var yDist = Math.round((_this.y - point.y) / vectorSize) * vectorSize;
          var xDist = Math.round((_this.x - point.x) / vectorSize) * vectorSize;
          _this.preference.push([point.id, relProx, prox, relRad, yDist, xDist]);
        }
      });
      // sort by distance to this, radial preference, SE emphasis
      this.preferences[0] = this.preference.sort(function (a, b) {
        // relative prox
        if (a[1] > b[1]) return 1;
        if (a[1] < b[1]) return -1;

        // relative radial
        if (a[3] > b[3]) return 1;
        if (a[3] < b[3]) return -1;

        // y (negative == down)
        if (a[4] > b[4]) return 1;
        if (a[4] < b[4]) return -1;

        // x (negative == right)
        if (a[5] > b[5]) return 1;
        if (a[5] > b[5]) return -1;

        // real prox
        if (a[2] > b[2]) return 1;
        if (a[2] < b[2]) return -1;

        return 0;
      });

      // sort by distance to this, radial ignorance, NW emphasis
      this.preferences[1] = this.preference.sort(function (a, b) {
        // relative prox
        if (a[1] > b[1]) return 1;
        if (a[1] < b[1]) return -1;

        // relative radial
        if (a[3] > b[3]) return -1;
        if (a[3] < b[3]) return 1;

        // y (positive == up)
        if (a[4] > b[4]) return -1;
        if (a[4] < b[4]) return 1;

        // x (positive == left)
        if (a[5] > b[5]) return -1;
        if (a[5] > b[5]) return 1;

        // real prox
        if (a[2] > b[2]) return -1;
        if (a[2] < b[2]) return 1;

        return 0;
      });

      // just ids
      this.preference = this.preference.map(function (p) {
        return p[0];
      });
      this.preferences[0] = this.preferences[0].map(function (p) {
        return p[0];
      });
      this.preferences[1] = this.preferences[1].map(function (p) {
        return p[0];
      });
    } }], [{ key: 'prox', value: function prox(x1, y1, x2, y2) {return Math.hypot(x2 - x1, y2 - y1);} }]);return Point;}();var


Group = function () {
  function Group(count) {_classCallCheck(this, Group);
    this.generatePoints(count);
  }_createClass(Group, [{ key: 'generatePoints', value: function generatePoints(

    count) {
      this.points = {};
      this.pointIds = [];
      var xs = 0;
      var ys = 0;
      for (var i = 0; i < count; i++) {
        var point = new Point({ x: Math.random(), y: Math.random() });
        this.points[point.id] = point;
        this.pointIds.push(point.id);
        xs += point.x;
        ys += point.y;
      }
      this.x = xs / count;
      this.y = ys / count;
      this.relatePoints();
      this.sortPoints();
    } }, { key: 'sortPoints', value: function sortPoints()

    {var _this2 = this;
      this.pointIds = this.pointIds.sort(function (a, b) {
        var apt = _this2.points[a];
        var bpt = _this2.points[b];

        // prefer real prox
        if (apt.proxC > bpt.proxC) return -1;
        if (apt.proxC < bpt.proxC) return 1;

        return 0;
      });
    } }, { key: 'relatePoints', value: function relatePoints()

    {var _this3 = this;
      var arr = this.pointIds.map(function (id) {
        return _this3.points[id];
      });
      arr.forEach(function (point) {
        point.relate(arr, _this3.x, _this3.y);
      });
    } }]);return Group;}();var


Connector = function () {
  function Connector() {_classCallCheck(this, Connector);}_createClass(Connector, [{ key: 'run', value: function run(_ref2)

    {var points = _ref2.points,pointIds = _ref2.pointIds;
      this.points = points;
      this.pointIds = pointIds;

      this.path1 = [pointIds[0]];
      this.path2 = [pointIds[0]];

      return this.loop();
    } }, { key: 'loop', value: function loop()

    {
      var last1 = this.path1[this.path1.length - 1];
      var last2 = this.path2[this.path2.length - 1];

      var conn1 = this.processPoint(last1, 0);
      if (conn1) this.path1.push(conn1);

      var conn2 = this.processPoint(last2, 1);
      if (conn2) this.path2.push(conn2);

      if (conn1 && conn2 || conn1 !== conn2) {
        return this.loop();
      } else {
        this.path1.push(this.path2[this.path2.length - 1]);
        this.path2.push(this.path1[this.path1.length - 2]);
        return { path1: this.path1, path2: this.path2 };
      }
    } }, { key: 'processPoint', value: function processPoint(

    pointId, pref) {
      var point = this.points[pointId];
      var prefs = point.preferences[pref];
      var foundId = null;
      var prefIdx = 0;
      while (!foundId && prefIdx < prefs.length) {
        var prefId = prefs[prefIdx];
        if (!this.path1.includes(prefId) && !this.path2.includes(prefId)) {
          foundId = prefId;
        }
        prefIdx++;
      }
      if (foundId) {
        point.connect(foundId);
        this.points[foundId].connect(point.id);
      }
      return foundId;
    } }]);return Connector;}();var


Canvas = function () {
  function Canvas() {_classCallCheck(this, Canvas);
    this.element1 = document.querySelector('#cvs1');
    this.context1 = this.element1.getContext('2d');
    this.element2 = document.querySelector('#cvs2');
    this.context2 = this.element2.getContext('2d');
    this.gutter = 30;
    this.diameter = this.element1.width;
    this.switchContext(0);
  }_createClass(Canvas, [{ key: 'clear', value: function clear()

    {
      this.context1.clearRect(0, 0, this.diameter, this.diameter);
      this.context2.clearRect(0, 0, this.diameter, this.diameter);
    } }, { key: 'switchContext', value: function switchContext(

    idx) {
      this.context = [this.context1, this.context2][idx];
    } }, { key: 'text', value: function text(

    x, y, _text) {var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      var fontSize = 14;
      var offsetY = y > 0.5 ? fontSize * (offset * 1.5) : fontSize * (offset * -1.5);
      this.context.fillStyle = 'white';
      this.context.font = fontSize + 'px Helvetica';
      this.context.fillText(_text, this.relative(x), this.relative(y) + offsetY);
    } }, { key: 'point', value: function point(

    x, y) {var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'red';
      this.context.fillStyle = fill;
      this.context.beginPath();
      this.context.arc(this.relative(x), this.relative(y), 4, 0, PI2);
      this.context.fill();
    } }, { key: 'path', value: function path(

    x1, y1, x2, y2) {var stroke = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'red';
      this.context.strokeStyle = stroke;
      this.context.lineWidth = 2;
      this.context.beginPath();
      this.context.moveTo(this.relative(x1), this.relative(y1));
      this.context.lineTo(this.relative(x2), this.relative(y2));
      this.context.stroke();
    } }, { key: 'relative', value: function relative(

    plot) {
      return plot * (this.diameter - this.gutter * 2) + this.gutter;
    } }]);return Canvas;}();var


Drawer = function () {
  function Drawer() {_classCallCheck(this, Drawer);
    this.canvas = new Canvas();
    this.drawStraight();
  }_createClass(Drawer, [{ key: 'update', value: function update(

    points, pointIds, paths, x, y) {
      this.x = x;
      this.y = y;
      this.speed = 8;
      this.pointIdx = 0;
      this.progress = 0;
      this.points = points;
      this.pointIds = pointIds;
      this.pointIdCount = pointIds.length;
      this.path1 = paths.path1;
      this.path2 = paths.path2;
      this.pointCount = paths.path1.length;
    } }, { key: 'drawEach', value: function drawEach()

    {var _this4 = this;
      var first = this.pointIdx === 0;
      var idx = this.pointIdx % this.pointIdCount;
      var pointEnd = this.progress % this.speed === 0;

      // clearing the canvases
      if (idx === 0 && pointEnd) {
        this.drawn = [];
        this.canvas.switchContext(1);
        this.canvas.clear();
        this.canvas.point(this.x, this.y, 'white');
        this.pointIds.forEach(function (pointId) {
          var point = _this4.points[pointId];
          _this4.canvas.point(point.x, point.y);
          // let text = point.id + ' ' + Math.round(point.proxC * 100) / 100;
          var text = Math.round(point.proxC * 100) / 100;
          _this4.canvas.text(point.x, point.y, text);
        });
      }
      this.canvas.switchContext(0);

      var ratio = this.progress % this.speed / (this.speed - 1);
      var point = this.points[this.pointIds[this.pointIdx % this.pointIdCount]];
      var drawn = [point.id];

      var skipped = 0;
      [point.connection1, point.connection2].forEach(function (pointId) {
        if (pointId) {
          if (_this4.drawn.includes(pointId)) {
            skipped++;
          } else {
            var conn = _this4.points[pointId];
            // drawn.push(pointId);
            var distX = (point.x - conn.x) * ratio;
            var distY = (point.y - conn.y) * ratio;
            var dx = point.x - distX;
            var dy = point.y - distY;
            _this4.canvas.path(point.x, point.y, dx, dy, 'red');
          }
        } else if (!point.connection1) {console.log('here');}
      });

      if (skipped === 2 && idx + 1 !== 0) {
        this.pointIdx++;
      } else {
        this.progress++;
      }

      if (this.progress % this.speed === 0) {
        drawn.forEach(function (id) {_this4.drawn.push(id);});
        this.pointIdx++;
      }
      window.requestAnimationFrame(function () {
        _this4.drawEach();
      });
    } }, { key: 'drawStraight', value: function drawStraight()

    {var _this5 = this;
      if (this.points) {
        var first = this.pointIdx === 0;
        var idx1 = this.pointIdx % this.pointCount;
        var pointEnd = this.progress % this.speed === 0;

        // clearing the canvases
        if (idx1 === 0 && pointEnd) {
          this.canvas.switchContext(1);
          this.canvas.clear();
          this.path1.forEach(function (pointId) {
            var point = _this5.points[pointId];
            _this5.canvas.point(point.x, point.y, 'red');
          });
          this.path2.forEach(function (pointId) {
            var point = _this5.points[pointId];
            _this5.canvas.point(point.x, point.y, 'blue');
            // this.canvas.text(point.x, point.y, Math.round(point.proxC * 100) / 100);
            // this.canvas.text(point.x, point.y, point.id);
          });
          this.canvas.point(this.x, this.y, 'yellow');
        }
        this.canvas.switchContext(0);

        var ratio = this.progress % this.speed / (this.speed - 1);

        [this.path1, this.path2].forEach(function (path, i) {
          var idx = _this5.pointIdx % _this5.pointCount;
          var point = _this5.points[path[idx]];
          var conn = _this5.points[path[idx + 1]];
          if (conn) {
            var distX = (point.x - conn.x) * ratio;
            var distY = (point.y - conn.y) * ratio;
            var dx = point.x - distX;
            var dy = point.y - distY;
            var color = ['red', 'blue'][i];
            _this5.canvas.path(point.x, point.y, dx, dy, color);
          }
        });


        this.progress++;
        if (this.progress % this.speed === 0) {
          this.pointIdx++;
        }
      }
      window.requestAnimationFrame(function () {
        _this5.drawStraight();
      });
    } }]);return Drawer;}();


var $input = document.querySelector('input');
var group = new Group();
var connector = new Connector();
var drawer = new Drawer();
function run() {
  var count = parseInt($input.value);
  group.generatePoints(count);
  var paths = connector.run(group);
  drawer.update(group.points, group.pointIds, paths, group.x, group.y);
}
run();
document.body.addEventListener('click', run);
$input.addEventListener('change', run);

function generateId() {
  var id = staticId++;
  if (id < 10) return '000' + id;
  if (id < 100) return '00' + id;
  if (id < 1000) return '0' + id;
  return id.toString();
}