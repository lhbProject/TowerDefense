$(function() {
	var tower_defense = {
		arrMap: [ //生成地图
			1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
		],
		routeMap: [
			0, 0, 0, '1B', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, '2R', 0, 0, 0, 0, 0, '3B', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, '4R', 0, 0, 0, 0, '5B', 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, '7B', 0, 0, 0, 0, 0, 0, '6L', 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, '8B', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		],
		col_num: 20, //每行个数
		col_width: 50, //格子宽度
		moneyNum: 200, //初始金币
		bulletRange: 80, //攻击范围
		bulletStyle: 'bullet', //子弹样式
		bulletSpeed: 10, //子弹速度
		bulletPower: 10, //子弹攻击力
		gw_num: 10, //怪物数量
		gwSpeed: 5, //怪物速度
		gwClass: 'gw', //怪物class
		gwBlood: 100, //怪物血量
		gwMoney: 10, //怪物金币
		ptClass: 'pt', //炮塔class
		ptPrice: 50, //炮塔价格
		elements: function() { //DOM元素
			this.$container = $('#container');
			this.$start = $('#start');
			this.$money = $('#money');
		},
		init: function() {
			this.elements();
			this.$money.val('￥' + this.moneyNum);
			this.creat_map();
			this.events();
		},
		events: function() { //事件集合
			var _this = this;
			this.$start.on('click', function() { //游戏开始
				_this.creatGwList();
				var timer = setInterval(function() {
					_this.attackGw();
				}, 300)

			});
			this.$container.on('click', '.box1', function() {
				_this.creatPt($(this));
			})
		},
		creat_map: function() { //创建地图
			var _this = this;
			_this.$container.width(_this.col_num * _this.col_width);
			$.each(_this.arrMap, function(i, value) {
				var $div = $('<div class="box box' + value + '"></div>');
				if(value == 0) {
					$div.text('开始')
				} else if(value == 3) {
					$div.text('结束')
				};
				$div.appendTo(_this.$container);
			})
		},
		creatGwList: function() { //创建怪物
			var _this = this,
				num = _this.gw_num,
				timer = setInterval(function() {
					if(num != 0) {
						_this.creatGw()
						num--
					} else {
						clearInterval(timer)
					}
				}, 500)
		},
		creatGw: function() {
			var $div = $('<div class="' + this.gwClass + '"></div>'),
				t = $('.box0').position().top,
				l = $('.box0').position().left;
			$div.css({
				'left': l,
				'top': t
			}).appendTo(this.$container);

			$div.get(0).gwBlood = this.gwBlood;
			$div.get(0).gwMoney = this.gwMoney;
			this.animateGw($div);
			//			console.log($div);
		},
		animateGw: function(gwObj) { //怪物运动
			var arr = [],
				routeArr = [],
				_this = this,
				now = 0,
				nowVal = 0,
				$box = this.$container.find('div');

			$.each(this.routeMap, function(i, value) { //获取怪物行进路线
				if(value) {
					arr.push({
						'dir': value,
						'index': i
					})
				}
			});
			arr.sort(function(a, b) {
				return a.dir.slice(0, -1) > b.dir.slice(0, -1);
			});
			$.each(arr, function(i, value) {
				var dir = value.dir.slice(-1)
				if(i == arr.length - 1) {
					return false
				}
				switch(dir) {
					case "T":
						routeArr.push({
							'dir': 'top',
							'speed': -_this.gwSpeed,
							'target': $box.eq(arr[i + 1].index).position().top
						});
						break;
					case "R":
						routeArr.push({
							'dir': 'left',
							'speed': _this.gwSpeed,
							'target': $box.eq(arr[i + 1].index).position().left
						});
						break
					case "B":
						routeArr.push({
							'dir': 'top',
							'speed': _this.gwSpeed,
							'target': $box.eq(arr[i + 1].index).position().top
						});
						break;
					case "L":
						routeArr.push({
							'dir': 'left',
							'speed': -_this.gwSpeed,
							'target': $box.eq(arr[i + 1].index).position().left
						});
						break;
				}
			});
			gwObj.get(0).timer = setInterval(function() {
				if(Math.abs(nowVal - routeArr[now].target) <= 1) {
					if(now == routeArr.length - 1) {
						clearInterval(gwObj.get(0).timer);
						alert('游戏结束');
						return false
					} else {
						now++;
					}
				};
				nowVal = gwObj.position()[routeArr[now].dir] + routeArr[now].speed;
				gwObj.css(routeArr[now].dir, nowVal);
			}, 30)
			console.log(gwObj);
		},
		creatPt: function(obj) { //创建炮塔
			var num = parseInt(this.$money.val().substring(1))
			if(num >= this.ptPrice) {
				obj.attr('class', this.ptClass);
				num -= this.ptPrice;
				this.$money.val('￥' + num);
			} else {
				alert('你没有足够的金币去建造炮塔');
			}
		},
		attackGw: function() { //攻击怪物
			var $pt = this.$container.find('.' + this.ptClass),
				_this = this;
			$pt.each(function() {
				_this.gwRange($(this));
			})
		},
		gwRange: function(pt) { //监听怪物范围
			var $gw = this.$container.find('.' + this.gwClass),
				attackArr = [],
				_this = this;
			$gw.each(function() {
				var gwP = $(this).position(),
					ptP = pt.position(),
					x = ptP.left - gwP.left,
					y = ptP.top - gwP.top,
					dis = Math.sqrt(x * x + y * y);
				if(dis <= _this.bulletRange) {
					attackArr.push($(this));
				}
			});
			this.bulletRun(pt, attackArr);
		},
		bulletRun: function(pt, attackArr) { //创建子弹攻击怪物
			var timer = null
//			console.log(attackArr[0]);
			if(attackArr.length) {
				var $bullet = $('<span class=' + this.bulletStyle + '></span>'),
					_this = this,
					bulletTarget = attackArr[0].offset();
				$bullet.css({
					'left': parseInt(pt.position().left) + parseInt((_this.col_width - 5) / 2),
					'top': parseInt(pt.position().top) + parseInt((_this.col_width - 5) / 2)
				});
				pt.append($bullet);
				timer = setInterval(function() {
					var btX = (bulletTarget.left + attackArr[0].width() / 2) - $bullet.offset().left,
						btY = (bulletTarget.top + attackArr[0].height() / 2) - $bullet.offset().top,
						btD = Math.sqrt(btX * btX + btY * btY),
						speedX = btX / btD * _this.bulletSpeed,
						speedY = btY / btD * _this.bulletSpeed;

					$bullet.css({
						'left': $bullet.position().left + speedX,
						'top': $bullet.position().top + speedY
					});
					if(_this.bulletPz($bullet, attackArr[0])) {
						attackArr[0].get(0).gwBlood = attackArr[0].get(0).gwBlood - _this.bulletPower;
						$bullet.remove();
						if(attackArr[0].get(0).gwBlood <= 0) {
							clearInterval(attackArr[0].get(0).timer);
							attackArr[0].remove();
							var val = parseInt(_this.$money.val().substring(1)) + _this.gwMoney;
							_this.$money.val("￥" + val);
							
						}
						clearInterval(timer);
					};

				}, 30)
			} else {
				pt.empty();
				clearInterval(timer);
				return false;
			}
		},
		bulletPz: function(obj1, obj2) { //是否攻击到怪物
			var bulletT = obj1.offset().top,
				bulletR = obj1.offset().left + obj1.width(),
				bulletB = obj1.offset().top + obj1.height(),
				bulletL = obj1.offset().left,
				gwT = obj2.offset().top,
				gwR = obj2.offset().left + obj2.width(),
				gwB = obj2.offset().top + obj2.height(),
				gwL = obj2.offset().left;
			if(bulletT > gwB || bulletR < gwL || bulletB < gwT || bulletL > gwR) {
				return false;
			} else {
				return true
			}

		}

	};
	tower_defense.init();
});