(function () {
 
            function parseJiraTime(time) {
                var splittedTime = time.split(", ");
 
                var result = 0;
                for (var i = 0; i < splittedTime.length; i++) {
                    var currentTimeUnit = splittedTime[i];
                    if (currentTimeUnit.indexOf("week") > -1) {
                        var count = parseInt(currentTimeUnit, 10);
                        result += (count * 40 * 60);
                    }
 
                    if (currentTimeUnit.indexOf("day") > -1) {
                        var count = parseInt(currentTimeUnit, 10);
                        result += (count * 8 * 60);
                    }
 
                    if (currentTimeUnit.indexOf("hour") > -1) {
                        var count = parseInt(currentTimeUnit, 10);
                        result += (count * 60);
                    }
 
                    if (currentTimeUnit.indexOf("min") > -1) {
                        var count = parseInt(currentTimeUnit, 10);
                        result += count;
                    }
                }
 
                return result;
            }
 
 
            var table = document.getElementById('issuetable');
            var ths = table.querySelectorAll('th');
            var index;
            Array.prototype.forEach.call(ths, function (th, i) {
                var data = th.getAttribute('data-id');
                if (data === 'timeestimate') index = i;
            });
            var rows = table.querySelectorAll('.issuerow');
            var total = 0;
            Array.prototype.forEach.call(rows, function (row) {
                var cells = row.querySelectorAll('td');
                cells = Array.prototype.slice.call(cells, 0);
                var value = cells[index].textContent;
                if (!value) return;
                total += parseJiraTime(value);
            });
            var totalHours=total/60; 
            var weeks = parseInt(total / (60 * 8 * 5), 10);
            total = total % (60 * 8 * 5);
 
            var days = parseInt(total / (60 * 8), 10);
            total = total % (60 * 8);
 
            var hours = parseInt(total / 60, 10);
            var minutes = total % 60;
 
            console.log('Total remaining estimate (hours): '+totalHours);
            console.log('Total remaining estimate (pretty): '+ weeks + 'w, ' + days + 'd, ' + hours + 'h, ' + minutes + 'm.');
            
            var remainingEstimateSpan  = document.getElementById('issuetable').getElementsByClassName('rowHeader')[0].getElementsByClassName('colHeaderLink sortable headerrow-timeestimate')[0].querySelector('[title="Sort By Remaining Estimate"]');
            
            remainingEstimateSpan.innerHTML = remainingEstimateSpan.innerHTML + ' ' + totalHours + ' hours'
        }());