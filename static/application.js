// A $( document ).ready() block.


$(document).ready(function () {
    "use strict";
    console.log("ready!");

    //onSubmit Action
    $('form#triangle-input').submit(function (event) {
        var invalid = false;
        //Reset fields to clear any previous value
        $('#type').empty();
        $('#result').hide();

        //Form validation for mandatory fields using TradeShift UI Error message
        $('form#triangle-input').find('.ts-error').removeClass('ts-error');
        $('form#triangle-input').find('.ts-errors').hide();
        $('form#triangle-input').find('input').each(function () {
            //  console.log($(this).val());
            if ($(this).prop('required') && $(this).val().trim() == "") {
                $(this).parent().addClass("ts-error");
                $(this).parent().siblings(".ts-errors").show();
                console.log("Required")
                invalid = true;
            }
        });
        if (invalid) {
            return false;
        }

        var x = parseInt($('input#side1').val());
        var y = parseInt($('input#side2').val());
        var z = parseInt($('input#side3').val());

        //Sorting the sides and assigning in descending order of length to perform triangle validation
        var sorted = [x, y, z].sort(function (a, b) {
            return b - a;
        });

        x = sorted[0];
        y = sorted[1];
        z = sorted[2];

        console.log(x + "---" + y + "---" + z);

        //Triangle Object
        /**********
         * Side1, Side2, Side 3  
         * type() - Returns type of triangle, validitates and returns if invalid
         * height() - Used to determine the points for plotting the triangle
         * short() - Used to determine the points for plotting the triangle
         ***********/
        var triangle = {
            side1: parseFloat(x),
            side2: parseFloat(y),
            side3: parseFloat(z),
            type: function () {

                if ((this.side1 > 0 && this.side2 > 0 && this.side3 > 0) && (this.side1 <= (this.side2 + this.side3))) {

                    if (this.side1 === this.side2 && this.side2 === this.side3 && this.side3 === this.side1) {
                        return "Equilateral";

                    } if (this.side1 === this.side2 || this.side2 === this.side3 || this.side3 === this.side1) {
                        return "Isosceles";

                    } if ((this.side1 !== this.side2) && (this.side2 !== this.side3)) {
                        return "Scalene";

                    }
                } else {
                    return "Side lengths are invalid to form a triangle !";

                }
            },
            height: function () {
                var s = ((this.side1 + this.side2 + this.side3) / 2);
                var A = Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
                var h = parseFloat(((2 * A) / this.side1));
                return h;
            },
            short: function () {
                var s2s = Math.pow(this.side2, 2);
                var h2 = Math.pow(this.height(), 2);
                var z1 = parseInt(Math.sqrt(s2s - h2));
                return z1;
            }
        };


        console.log(triangle.type());
        console.log(triangle.height());
        console.log(triangle.short());
        //Result
        $('#result').show();
        $('#type').text(triangle.type());

        var x1 = x;
        var x2 = triangle.short();
        var y2 = triangle.height();

        console.log("SVG-->" + x1 + "--" + x2 + "--" + y2);

        if ($('#type').text() !== "Side lengths are invalid to form a triangle !") {
            $('#picture').show();
            //point1    //point2     //point3
            $('polygon').attr("points", '0,0 ' + x1 + ",0 " + x2 + "," + y2);
        } else {
            $('#picture').hide();
        }

    });

});


