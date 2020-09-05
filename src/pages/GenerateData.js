// investigator filter
var investigatorFilter = (tickets, name) => {
  return tickets.filter(
    ticket => ticket.assignedEmail != null && ticket.assignedEmail.name === name
  );
};

// stakeholder type filter
var typeFilter = (tickets, type) => {
  return tickets.filter(ticket => ticket.type != null && ticket.type === type);
};

//status filter
var statusFilter = (tickets, status) => {
  return tickets.filter(
    ticket => ticket.status != null && ticket.status === status
  );
};

//status filter
// var severityFilter = (tickets, severity) => {
//   return tickets.filter(
//     ticket => ticket.severityLevel != null && ticket.severityLevel === severity
//   );
// };

// category filter
var categoryFilter = (tickets, name) => {
  return tickets.filter(
    ticket => ticket.category != null && ticket.category === name
  );
};

var daysInfo = tickets => {
  const dayArr = tickets.map(e => new Date(e.dateSubmitted.value));
  const toDay = Math.max(...dayArr);
  const fromDay = Math.min(...dayArr);
  const diff = toDay - fromDay;

  const daysInfo = {
    dayDuration: diff !== 0 ? parseInt(diff / (24 * 60 * 60 * 1000)) + 1 : 1,
    from: fromDay,
    to: toDay
  };
  return daysInfo;
};

// funciton last week filter
// eslint-disable-next-line no-extend-native
Date.prototype.getWeekOfMonth = function () {
  var firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  var offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
};

function lastWeekFilter(tickets, day) {
  if (day.getWeekOfMonth() > 0)
    return tickets.filter(
      ticket =>
        ticket.dateSubmitted.year === day.getFullYear() &&
        ticket.dateSubmitted.month === day.getMonth() &&
        ticket.dateSubmitted.week === day.getWeekOfMonth() - 1
    );
  else
    return tickets.filter(
      ticket =>
        ticket.dateSubmitted.year === day.getFullYear() &&
        ticket.dateSubmitted.month === day.getMonth() - 1 &&
        ticket.dateSubmitted.week === 3
    );
}

// last month filter

function monthFilter(tickets, month) {
  const day = new Date();
  return tickets.filter(
    ticket =>
      ticket.dateSubmitted.year === day.getFullYear() &&
      ticket.dateSubmitted.month === month
  );
}

class GenerateData {
  daysInfo = tickets => {
    const dayArr = tickets.map(e => new Date(e.dateSubmitted.value));
    const toDay = Math.max(...dayArr);
    const fromDay = Math.min(...dayArr);
    const diff = toDay - fromDay;

    const daysInfo = {
      dayDuration: parseInt(diff / (24 * 60 * 60 * 1000)),
      from: fromDay,
      to: toDay
    };
    return daysInfo;
  };

  investigator = tickets => {
    // tickets by investigator
    const invest1Tickets = investigatorFilter(tickets, "investigator 1");
    const invest2Tickets = investigatorFilter(tickets, "investigator 2");
    const invest3Tickets = investigatorFilter(tickets, "investigator 3");
    const noAssignedTickets = tickets.filter(
      ticket => ticket.assignedEmail == null
    );

    // pie data (tickets by investigator)
    return [
      { name: "Investigator 1", value: invest1Tickets.length },
      { name: "Investigator 2", value: invest2Tickets.length },
      { name: "Investigator 3", value: invest3Tickets.length },
      { name: "Unassigned", value: noAssignedTickets.length }
    ];
  };

  category = tickets => {
    const Stu1 = categoryFilter(tickets, "Stu1");
    const Stu2 = categoryFilter(tickets, "Stu2");
    const Stu3 = categoryFilter(tickets, "Stu3");
    const Stu4 = categoryFilter(tickets, "Stu4");
    const Sta1 = categoryFilter(tickets, "Sta1");
    const Sta2 = categoryFilter(tickets, "Sta2");
    const Sta3 = categoryFilter(tickets, "Sta3");
    const Sta4 = categoryFilter(tickets, "Sta4");
    const Sta5 = categoryFilter(tickets, "Sta5");
    const Sta6 = categoryFilter(tickets, "Sta6");
    const Sta7 = categoryFilter(tickets, "Sta7");
    const Sta8 = categoryFilter(tickets, "Sta8");
    const Sta9 = categoryFilter(tickets, "Sta9");
    const Sta10 = categoryFilter(tickets, "Sta10");

    return [
      { category: "Stu1", tickets: Stu1.length },
      { category: "Stu2", tickets: Stu2.length },
      { category: "Stu3", tickets: Stu3.length },
      { category: "Stu4", tickets: Stu4.length },
      { category: "Sta1", tickets: Sta1.length },
      { category: "Sta2", tickets: Sta2.length },
      { category: "Sta3", tickets: Sta3.length },
      { category: "Sta4", tickets: Sta4.length },
      { category: "Sta5", tickets: Sta5.length },
      { category: "Sta6", tickets: Sta6.length },
      { category: "Sta7", tickets: Sta7.length },
      { category: "Sta8", tickets: Sta8.length },
      { category: "Sta9", tickets: Sta9.length },
      { category: "Sta10", tickets: Sta10.length }
    ];
  };

  type = tickets => {
    // tickets by type

    const typeStudentTickets = typeFilter(tickets, "student");
    const studentInvalid = statusFilter(typeStudentTickets, "invalid").length;
    const studentValid = typeStudentTickets.length - studentInvalid;

    const typeStaffTickets = typeFilter(tickets, "staff");
    const staffInvalid = statusFilter(typeStaffTickets, "invalid").length;
    const staffValid = typeStaffTickets.length - staffInvalid;

    const typePublicTickets = typeFilter(tickets, "public");
    const publicInvalid = statusFilter(typePublicTickets, "invalid").length;
    const publicValid = typePublicTickets.length - publicInvalid;

    const typeAnonymousTickets = typeFilter(tickets, "anonymous");
    const anonymousInvalid = statusFilter(typeAnonymousTickets, "invalid")
      .length;
    const anonymousValid = typeAnonymousTickets.length - anonymousInvalid;

    // bar data (tickets by stakeholder type)
    return [
      { name: "Student", Valid: studentValid, Invalid: studentInvalid },
      { name: "Staff", Valid: staffValid, Invalid: staffInvalid },
      { name: "Public", Valid: publicValid, Invalid: publicInvalid },
      { name: "Anonymous", Valid: anonymousValid, Invalid: anonymousInvalid }
    ];
  };

  // ticket by statuses
  status = tickets => {
    const invalid = statusFilter(tickets, "invalid");
    const pending = statusFilter(tickets, "pending");
    const onProcess = statusFilter(tickets, "on process");
    const finished = statusFilter(tickets, "finished");
    const closed = statusFilter(tickets, "closed");

    return [
      { name: "Invalid", value: invalid.length },
      { name: "Pending", value: pending.length },
      { name: "On Process", value: onProcess.length },
      { name: "Finished", value: finished.length },
      { name: "Closed", value: closed.length }
    ];
  };

  // last week data
  lastWeek = tickets => {
    const today = new Date();
    const lastWeek = lastWeekFilter(tickets, today);

    let arrWeek = [];

    const sun = lastWeek.filter(day => day.dateSubmitted.day === 0);
    arrWeek.push(sun.length);
    const mon = lastWeek.filter(day => day.dateSubmitted.day === 1);
    arrWeek.push(mon.length);
    const tue = lastWeek.filter(day => day.dateSubmitted.day === 2);
    arrWeek.push(tue.length);
    const wed = lastWeek.filter(day => day.dateSubmitted.day === 3);
    arrWeek.push(wed.length);
    const thur = lastWeek.filter(day => day.dateSubmitted.day === 4);
    arrWeek.push(thur.length);
    const fri = lastWeek.filter(day => day.dateSubmitted.day === 5);
    arrWeek.push(fri.length);
    const sat = lastWeek.filter(day => day.dateSubmitted.day === 6);
    arrWeek.push(sat.length);

    // creating insights
    const totalTickets = lastWeek.length;
    const maxDay = arrWeek.indexOf(Math.max(...arrWeek));
    const maxDayValue = arrWeek[maxDay];
    let day;
    switch (maxDay) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thu";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
        break;
      default:
        day = "";
        break;
    }

    const insight = {
      totalTicket: totalTickets,
      maxDay: day,
      maxDayValue: maxDayValue
    };
    return {
      data: [
        { name: "Mon", tickets: mon.length },
        { name: "Tue", tickets: tue.length },
        { name: "Wed", tickets: wed.length },
        { name: "Thu", tickets: thur.length },
        { name: "Fri", tickets: fri.length },
        { name: "Sat", tickets: sat.length },
        { name: "Sun", tickets: sun.length }
      ],
      insight: insight
    };
  };

  // month insights
  monthInsight = (values, month) => {
    const tickets = monthFilter(values, month);

    let arrMonth = [];
    switch (month) {
      case 0:
        for (let i = 0; i < 31; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 1:
        for (let i = 0; i < 28; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 2:
        for (let i = 0; i < 31; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 3:
        for (let i = 0; i < 30; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 4:
        for (let i = 0; i < 31; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 5:
        for (let i = 0; i < 30; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 6:
        for (let i = 0; i < 31; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 7:
        for (let i = 0; i < 31; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 8:
        for (let i = 0; i < 30; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 9:
        for (let i = 0; i < 31; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 10:
        for (let i = 0; i < 30; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      case 11:
        for (let i = 0; i < 31; i++) {
          arrMonth[i] = tickets.filter(
            day => new Date(day.dateSubmitted.value).getDate() === i
          ).length;
        }
        break;
      default:
        break;
    }

    // creating insights
    const totalTickets = tickets.length;
    const averageDay = totalTickets / arrMonth.length;
    const hightestDay = arrMonth.indexOf(Math.max(...arrMonth));

    const insight = {
      totalTickets: totalTickets,
      averageDay: averageDay,
      hightestDay: hightestDay,
      highestValue: arrMonth[hightestDay]
    };

    const data = arrMonth.map((e, index) => ({
      day: "Day " + index,
      tickets: e
    }));

    return {
      data: data,
      insight: insight
    };
  };

  // time range
  timeRange = (from, to, tickets) => {
    const timeFilter = tickets.filter(e => {
      const date = new Date(e.dateSubmitted.value);
      return date >= from && date <= to;
    });
    return timeFilter;
  };

  // create insights
  createInsight = tickets => {
    const investigatorInsight = this.investigator(tickets);
    const arrInve = investigatorInsight.map(e => e.value);
    const maxInve = arrInve.indexOf(Math.max(...arrInve));

    const typeInsight = this.type(tickets);
    const arrType = typeInsight.map(e => e.Invalid + e.Valid);
    const maxType = arrType.indexOf(Math.max(...arrType));

    const statusInsight = this.status(tickets);

    const daysInfoInsight = daysInfo(tickets);
    return {
      total: tickets.length,
      daysInfo: daysInfoInsight,
      investigator: investigatorInsight,
      maxInve: maxInve,
      type: typeInsight,
      maxType: maxType,
      status: statusInsight
    };
  };
}

export default new GenerateData();
