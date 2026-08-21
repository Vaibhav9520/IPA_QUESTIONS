export interface Question {
  id: number;
  title: string;
  question: string;
  marks: 15 | 35;
  category: 'IPA' | 'PRA' | 'ADMIN';
  subcategory: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  input?: string;
  output?: string;
  examples?: { input: string; output: string }[];
  answer: { explanation: string; code?: string } | null;
  sourceFile: string;
  adminOnly?: boolean;
}

export const questions: Question[] = [

  // ── IPA 35-MARK QUESTIONS (from IPA folders — have separate question.txt + solution.java) ──────

  {
    id: 1,
    title: "IPA1 — Course: Avg Quiz by Admin & Sort by HandsOn",
    question: `Create the class Course with below attributes:
courseId - int, courseName - String, courseAdmin - String, quiz - int, handson - int

Implement two static methods:
1. findAvgOfQuizByAdmin — returns average (int) of quiz for given admin. Return 0 if not found.
2. sortCourseByHandsOn — returns Course[] sorted ascending by handson, where handson < given int. Return null if none found.

Print "No Course found" if avg=0, "No Course found with mentioned attribute." if null.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "111\nkubernetes\nNisha\n40\n10\n321\ncassandra\nRoshini\n30\n15\n457\nApache Spark\nNisha\n30\n12\n987\nsite core\nTirth\n50\n20\nNisha\n17",
    output: "35\nkubernetes\nApache Spark\ncassandra",
    examples: [],
    answer: {
      explanation: "Iterate array to sum quiz where admin matches, divide by count. For sortCourseByHandsOn, filter handson < h, then bubble sort ascending.",
      code: `import java.util.*;
public class courseProgram {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Course[] course = new Course[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine();
            String b = sc.nextLine();
            String c = sc.nextLine();
            int d = sc.nextInt(); sc.nextLine();
            int e = sc.nextInt(); sc.nextLine();
            course[i] = new Course(a, b, c, d, e);
        }
        String admin = sc.nextLine();
        int hand = sc.nextInt();
        int ans1 = findAvgOfQuizByAdmin(course, admin);
        if (ans1 != 0) System.out.println(ans1);
        else System.out.println("No Course found");
        Course[] ans2 = sortCourseByHandsOn(course, hand);
        if (ans2 != null) for (Course c : ans2) System.out.println(c.getCname());
        else System.out.println("No Course found with mentioned attribute.");
    }
    public static int findAvgOfQuizByAdmin(Course[] course, String ad) {
        int sum = 0, count = 0;
        for (Course c : course)
            if (c.getCadmin().equalsIgnoreCase(ad)) { sum += c.getQuiz(); count++; }
        return count > 0 ? sum / count : 0;
    }
    public static Course[] sortCourseByHandsOn(Course[] course, int h) {
        Course[] obj = new Course[0];
        for (Course c : course)
            if (c.getHandson() < h) { obj = Arrays.copyOf(obj, obj.length + 1); obj[obj.length - 1] = c; }
        for (int i = 0; i < obj.length; i++)
            for (int j = i + 1; j < obj.length; j++)
                if (obj[i].getHandson() > obj[j].getHandson()) { Course t = obj[i]; obj[i] = obj[j]; obj[j] = t; }
        return obj.length > 0 ? obj : null;
    }
}
class Course {
    private int cid, quiz, handson;
    private String cname, cadmin;
    public Course(int cid, String cname, String cadmin, int quiz, int handson) {
        this.cid=cid; this.cname=cname; this.cadmin=cadmin; this.quiz=quiz; this.handson=handson;
    }
    public int getCid() { return cid; }
    public String getCname() { return cname; }
    public String getCadmin() { return cadmin; }
    public int getQuiz() { return quiz; }
    public int getHandson() { return handson; }
}`
    },
    sourceFile: "IPA1/courseProgram.java"
  },

  {
    id: 2,
    title: "IPA3 — Student: Count DayScholars & Second Highest Score",
    question: `Create class Student: rollNo(int), name(String), branch(String), score(double), dayScholar(boolean)

Implement:
1. findCountOfDayscholarStudents — count students where dayScholar=true AND score>80. Return 0 if none.
2. findStudentWithSecondHighestScore — return Student with 2nd highest score among non-dayScholars. Return null if all are dayScholars.

Print count or "No student found". Print rollNo#name#score or "No student found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "1001\nAshwa\nIT\n85\ntrue\n1002\nPreeti\nIT\n70\nfalse\n1003\nUma\nECE\n85\nfalse\n1004\nAkash\nEEE\n90\ntrue",
    output: "2\n1002#Preeti#70.0",
    examples: [],
    answer: {
      explanation: "Count students with dayScholar=true and score>80. For second highest, filter non-dayScholars, sort scores, return student with 2nd highest.",
      code: `import java.util.*;
public class IPA3 {
    public static void main(String[] args) {
        Student[] student = new Student[4];
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine();
            String b = sc.nextLine(); String c = sc.nextLine();
            double d = sc.nextDouble(); sc.nextLine();
            boolean e = sc.nextBoolean();
            student[i] = new Student(a, b, c, d, e);
        }
        int ans1 = findCountofDayscholarStudents(student);
        if (ans1 > 0) System.out.println(ans1);
        else System.out.println("No student found");
        Student ans2 = findStudentWithSecondHighestScore(student);
        if (ans2 == null) System.out.println("No student found");
        else System.out.println(ans2.getRollNo() + "#" + ans2.getName() + "#" + ans2.getScore());
    }
    public static int findCountofDayscholarStudents(Student[] s) {
        int count = 0;
        for (Student st : s) if (st.getDayScholar() && st.getScore() > 80) count++;
        return count;
    }
    public static Student findStudentWithSecondHighestScore(Student[] s) {
        double[] arr = new double[0];
        for (Student st : s)
            if (!st.getDayScholar()) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = st.getScore(); }
        Arrays.sort(arr);
        double shs = arr[arr.length - 2];
        for (Student st : s) if (st.getScore() == shs) return st;
        return null;
    }
}
class Student {
    private int rollNo; private String name, branch; private double score; private boolean dayScholar;
    public Student(int rollNo, String name, String branch, double score, boolean dayScholar) {
        this.rollNo=rollNo; this.name=name; this.branch=branch; this.score=score; this.dayScholar=dayScholar;
    }
    public int getRollNo() { return rollNo; }
    public String getName() { return name; }
    public String getBranch() { return branch; }
    public double getScore() { return score; }
    public boolean getDayScholar() { return dayScholar; }
}`
    },
    sourceFile: "IPA3/IPA3.java"
  },

  {
    id: 3,
    title: "IPA4 — College: Max Pincode & Search by Address",
    question: `Create class College: id(int), name(String), contactNo(int), address(String), pinCode(int)

Implement:
1. findCollegeWithMaximumPincode — return College with max pincode.
2. searchCollegeByAddress — return College matching given address (case-insensitive).

Print full College details or "No college found with mentioned attribute".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "4\n109\nACT\n2500256\nmumbai\n695001\n107\nMCE\n2500254\nmalapuram\n612354\n113\nCTE\n2500252\nchennai\n623145\n102\nSCT\n2500255\nAP\n523641\nAP",
    output: "ID : 109\nName : ACT\nContact No : 2500256\nAddress : mumbai\nPin : 695001\nID : 102\nName : SCT\nContact No : 2500255\nAddress : AP\nPin : 523641",
    examples: [],
    answer: {
      explanation: "Find max pincode by iterating array, then find matching college. Search by address uses equalsIgnoreCase.",
      code: `import java.util.*;
public class IPA4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        College[] college = new College[n];
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine();
            int c = sc.nextInt(); sc.nextLine(); String d = sc.nextLine();
            int e = sc.nextInt(); sc.nextLine();
            college[i] = new College(a, b, c, d, e);
        }
        String address = sc.nextLine();
        College pin = findCollegeWithMaximumPincode(college);
        printCollege(pin);
        College add = searchCollegeByAddress(college, address);
        printCollege(add);
    }
    static void printCollege(College c) {
        if (c != null) {
            System.out.println("ID : "+c.getId()); System.out.println("Name : "+c.getName());
            System.out.println("Contact No : "+c.getContactNo()); System.out.println("Address : "+c.getAddress());
            System.out.println("Pin : "+c.getPin());
        } else System.out.println("No college found with mentioned attribute");
    }
    public static College findCollegeWithMaximumPincode(College[] c) {
        int max = 0; College res = null;
        for (College cl : c) if (cl.getPin() > max) { max = cl.getPin(); res = cl; }
        return res;
    }
    public static College searchCollegeByAddress(College[] c, String add) {
        for (College cl : c) if (cl.getAddress().equalsIgnoreCase(add)) return cl;
        return null;
    }
}
class College {
    int id, contactNo, pin; String name, address;
    public College(int id, String name, int contactNo, String address, int pin) {
        this.id=id; this.name=name; this.contactNo=contactNo; this.address=address; this.pin=pin;
    }
    public int getId() { return id; } public String getName() { return name; }
    public int getContactNo() { return contactNo; } public String getAddress() { return address; }
    public int getPin() { return pin; }
}`
    },
    sourceFile: "IPA4/IPA4.java"
  },

  {
    id: 4,
    title: "IPA5 — Motel: Total Rooms Booked by CabFacility",
    question: `Create class Motel: motelId(int), motelName(String), dateOfBooking(String), noOfRoomsBooked(int), cabFacility(String), totalBill(double)

Implement:
totalNoOfRoomsBooked — returns total rooms where cabFacility matches AND noOfRoomsBooked > 5. Return 0 if none.

Print total or "No such rooms booked".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "1001\nM&M\n01-Dec-2022\n5\nYes\n30000\n1002\nBestStay\n10-Jan-2022\n3\nYes\n27000\n1003\nNovatel\n11-Jun-2022\n5\nYes\n25000\n1004\nChola\n01-Sep-2022\n7\nYes\n72000\nYes",
    output: "7",
    examples: [],
    answer: {
      explanation: "Sum noOfRoomsBooked where cabFacility matches (case-insensitive) and noOfRoomsBooked > 5.",
      code: `import java.util.*;
public class IPA5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Motel[] m = new Motel[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            int d = sc.nextInt(); sc.nextLine(); String e = sc.nextLine();
            double f = sc.nextDouble(); sc.nextLine();
            m[i] = new Motel(a, b, c, d, e, f);
        }
        String cf = sc.nextLine();
        int total = totalNoOfRoomsBooked(m, cf);
        if (total != 0) System.out.println(total);
        else System.out.println("No such rooms booked");
    }
    public static int totalNoOfRoomsBooked(Motel[] m, String check) {
        int total = 0;
        for (Motel mo : m)
            if (mo.getCabFacility().equalsIgnoreCase(check) && mo.getNoOfRoomsBooked() > 5)
                total += mo.getNoOfRoomsBooked();
        return total;
    }
}
class Motel {
    private int motelId, noOfRoomsBooked; private String motelName, dateOfBooking, cabFacility; private double totalBill;
    public Motel(int motelId, String motelName, String dateOfBooking, int noOfRoomsBooked, String cabFacility, double totalBill) {
        this.motelId=motelId; this.motelName=motelName; this.dateOfBooking=dateOfBooking;
        this.noOfRoomsBooked=noOfRoomsBooked; this.cabFacility=cabFacility; this.totalBill=totalBill;
    }
    public int getNoOfRoomsBooked() { return noOfRoomsBooked; }
    public String getCabFacility() { return cabFacility; }
}`
    },
    sourceFile: "IPA5/IPA5.java"
  },

  {
    id: 5,
    title: "IPA6 — RRT: Highest Priority Ticket by Project",
    question: `Create class RRT (Rapid Response Team): ticketNo(int), raisedBy(String), assignedTo(String), priority(int), project(String)

Implement:
getHighestPriorityTicket — returns RRT with lowest priority number for given project (case-insensitive). Return null if not found.

Print ticketNo, raisedBy, assignedTo or "No such ticket."`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "123\nVelantish\nMani\n3\nXperience\n234\nSathish\nAkshaya\n1\nAIG\n345\nJohn\nJack\n2\nAIG\n456\nBhuvi\nJack\n5\nAIG\nAIG",
    output: "234\nSathish\nAkshaya",
    examples: [
      { input: "...AIG", output: "234\nSathish\nAkshaya" },
      { input: "...Xplore", output: "No such ticket." }
    ],
    answer: {
      explanation: "Filter RRT objects matching project, sort by priority ascending (lower = higher priority), return first.",
      code: `import java.util.*;
public class IPA6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        RRT[] r = new RRT[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            int d = sc.nextInt(); sc.nextLine(); String e = sc.nextLine();
            r[i] = new RRT(a, b, c, d, e);
        }
        String pro = sc.nextLine();
        RRT ans = getHighestPriorityTicket(r, pro);
        if (ans != null) {
            System.out.println(ans.getTicketNo()); System.out.println(ans.getRaisedBy()); System.out.println(ans.getAssignedTo());
        } else System.out.println("No such ticket.");
    }
    public static RRT getHighestPriorityTicket(RRT[] rt, String p) {
        RRT[] r = new RRT[0];
        for (RRT rrt : rt)
            if (rrt.getProject().equalsIgnoreCase(p)) { r = Arrays.copyOf(r, r.length+1); r[r.length-1] = rrt; }
        for (int i = 0; i < r.length; i++)
            for (int j = i+1; j < r.length; j++)
                if (r[i].getPriority() > r[j].getPriority()) { RRT t = r[i]; r[i] = r[j]; r[j] = t; }
        return r.length > 0 ? r[0] : null;
    }
}
class RRT {
    private int ticketNo, priority; private String raisedBy, assignedTo, project;
    public RRT(int ticketNo, String raisedBy, String assignedTo, int priority, String project) {
        this.ticketNo=ticketNo; this.raisedBy=raisedBy; this.assignedTo=assignedTo; this.priority=priority; this.project=project;
    }
    public int getTicketNo() { return ticketNo; } public String getRaisedBy() { return raisedBy; }
    public String getAssignedTo() { return assignedTo; } public int getPriority() { return priority; }
    public String getProject() { return project; }
}`
    },
    sourceFile: "IPA6/IPA6.java"
  },

  {
    id: 6,
    title: "IPA7 — Sim: Transfer Customer Circle",
    question: `Create class Sim: simId(int), customerName(String), balance(double), ratePerSecond(double), circle(String)

Implement:
transferCustomerCircle — takes Sim[], circle1(String), circle2(String). Transfer matching sims from circle1 to circle2. Return array sorted descending by ratePerSecond.

Print simId, customerName, circle, ratePerSecond for each.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "1\nraj\n100\n1.5\nKOL\n2\nchetan\n200\n1.6\nAHD\n3\nasha\n150\n1.7\nMUM\n4\nkiran\n50\n2.2\nAHD\n5\nvijay\n130\n1.8\nAHD\nAHD\nKOL",
    output: "4 kiran KOL 2.2\n5 vijay KOL 1.8\n2 chetan KOL 1.6",
    examples: [],
    answer: {
      explanation: "Filter sims matching circle1, update their circle to circle2, sort descending by ratePerSecond, print reversed.",
      code: `import java.util.*;
public class IPA7 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Sim[] s = new Sim[5];
        for (int i = 0; i < 5; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine();
            double c = sc.nextDouble(); double d = sc.nextDouble(); sc.nextLine(); String e = sc.nextLine();
            s[i] = new Sim(a, b, c, d, e);
        }
        String c1 = sc.nextLine(), c2 = sc.nextLine();
        Sim[] arr = transfer(s, c1, c2);
        if (arr != null)
            for (int i = arr.length-1; i >= 0; i--)
                System.out.println(arr[i].getSimId()+" "+arr[i].getCustomerName()+" "+arr[i].circle+" "+arr[i].getRatePerSecond());
    }
    public static Sim[] transfer(Sim[] s, String c1, String c2) {
        Sim[] details = new Sim[0];
        for (Sim sim : s)
            if (sim.getCircle().equalsIgnoreCase(c1)) { sim.circle = c2; details = Arrays.copyOf(details, details.length+1); details[details.length-1] = sim; }
        for (int i = 0; i < details.length; i++)
            for (int j = i+1; j < details.length; j++)
                if (details[i].getRatePerSecond() > details[j].getRatePerSecond()) { Sim t = details[i]; details[i] = details[j]; details[j] = t; }
        return details.length > 0 ? details : null;
    }
}
class Sim {
    int simId; String customerName, circle; double balance, ratePerSecond;
    public Sim(int simId, String customerName, double balance, double ratePerSecond, String circle) {
        this.simId=simId; this.customerName=customerName; this.balance=balance; this.ratePerSecond=ratePerSecond; this.circle=circle;
    }
    public int getSimId() { return simId; } public String getCustomerName() { return customerName; }
    public double getRatePerSecond() { return ratePerSecond; } public String getCircle() { return circle; }
}`
    },
    sourceFile: "IPA7/IPA7.java"
  },

  {
    id: 7,
    title: "IPA8 — Hotel: Rooms by Month & Second Highest Bill by WiFi",
    question: `Create class Hotel: hotelId(int), hotelName(String), dateOfBooking(String dd-mon-yyyy), noOfRoomsBooked(int), wifiFacility(String), totalBill(double)

Implement:
1. noOfRoomsBookedInGivenMonth — return total rooms for given month string. Return 0 if not found.
2. searchHotelByWifiOption — return hotelId with 2nd highest totalBill among matching wifi. Return 0 if not found.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "101\nBest Stay\n01-jan-2022\n10\nYes\n20000\n102\nApple Stay\n12-Feb-2022\n3\nYes\n4000\n103\nAccord\n11-May-2022\n5\nYes\n15000\n104\nRoyal Park\n22-Dec-2021\n7\nYes\n12000\nMay\nYes",
    output: "5\n103",
    examples: [],
    answer: {
      explanation: "Use String.contains(month) for month match. For wifi, collect matching hotel IDs, sort, return second highest bill's ID.",
      code: `import java.util.*;
public class IPA8 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Hotel[] h = new Hotel[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            int d = sc.nextInt(); sc.nextLine(); String e = sc.nextLine();
            double f = sc.nextDouble(); sc.nextLine();
            h[i] = new Hotel(a, b, c, d, e, f);
        }
        String month = sc.nextLine(), wf = sc.nextLine();
        int ans1 = noOfRoomsBookedInGivenMonth(h, month);
        System.out.println(ans1 != 0 ? ans1 : "No rooms booked in the given month");
        int ans2 = searchHotelByWifiOption(h, wf);
        System.out.println(ans2 != 0 ? ans2 : "No such option available");
    }
    public static int noOfRoomsBookedInGivenMonth(Hotel[] h, String m) {
        for (Hotel ho : h) if (ho.getDate().contains(m)) return ho.getRoom();
        return 0;
    }
    public static int searchHotelByWifiOption(Hotel[] h, String w) {
        int[] id = new int[0];
        for (Hotel ho : h)
            if (ho.getWifi().equalsIgnoreCase(w)) { id = Arrays.copyOf(id, id.length+1); id[id.length-1] = ho.getId(); Arrays.sort(id); }
        return id.length > 0 ? id[id.length-2] : 0;
    }
}
class Hotel {
    private int id, room; private String name, date, wifi; private double bill;
    public Hotel(int id, String name, String date, int room, String wifi, double bill) {
        this.id=id; this.name=name; this.date=date; this.room=room; this.wifi=wifi; this.bill=bill;
    }
    public int getId() { return id; } public String getDate() { return date; }
    public int getRoom() { return room; } public String getWifi() { return wifi; }
    public double getBill() { return bill; }
}`
    },
    sourceFile: "IPA8/IPA8.java"
  },

  {
    id: 8,
    title: "IPA9 — Book: Max Price & Search by Title",
    question: `Create class Book: id(int), pages(int), title(String), author(String), price(double)

Implement:
1. findBookWithMaximumPrice — return Book[] with max price. Return null if none.
2. searchBookByTitle — return Book matching title (case-insensitive). Return null if not found.

Print id+title for max, id+pages for title search. Print "No Book found with mentioned attribute." if null.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "1\n845\nBengali\nArijit\n525.50\n2\n456\nEnglish\nRaju\n412.30\n3\n1022\nHistory\nKaka\n525.50\n4\n125\ngeography\nMN\n524\nEnglish",
    output: "1 Bengali\n3 History\n2\n456",
    examples: [],
    answer: {
      explanation: "Find max price, collect all books at that price. Search by title using equalsIgnoreCase.",
      code: `import java.util.*;
public class IPA9 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Book[] bk = new Book[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); int b = sc.nextInt(); sc.nextLine();
            String c = sc.nextLine(); String d = sc.nextLine(); double e = sc.nextDouble(); sc.nextLine();
            bk[i] = new Book(a, b, c, d, e);
        }
        String name = sc.nextLine();
        Book[] ans1 = findBookWithMaximumPrice(bk);
        if (ans1 != null) for (Book b : ans1) System.out.println(b.getId()+" "+b.getTitle());
        else System.out.println("No Book found with mentioned attribute.");
        Book ans2 = searchBookByTitle(bk, name);
        if (ans2 != null) { System.out.println(ans2.getId()); System.out.println(ans2.getPages()); }
        else System.out.println("No Book found with mentioned attribute.");
    }
    public static Book[] findBookWithMaximumPrice(Book[] b) {
        double max = 0;
        for (Book bk : b) if (bk.getPrice() >= max) max = bk.getPrice();
        Book[] details = new Book[0];
        for (Book bk : b) if (bk.getPrice() == max) { details = Arrays.copyOf(details, details.length+1); details[details.length-1] = bk; }
        return details.length > 0 ? details : null;
    }
    public static Book searchBookByTitle(Book[] b, String n) {
        for (Book bk : b) if (bk.getTitle().equalsIgnoreCase(n)) return bk;
        return null;
    }
}
class Book {
    private int id, pages; private String title, author; private double price;
    public Book(int id, int pages, String title, String author, double price) {
        this.id=id; this.pages=pages; this.title=title; this.author=author; this.price=price;
    }
    public int getId() { return id; } public int getPages() { return pages; }
    public String getTitle() { return title; } public double getPrice() { return price; }
}`
    },
    sourceFile: "IPA9/IPA9.java"
  },

  {
    id: 9,
    title: "IPA10 — Employee: Count by Branch Transport & Second Highest Rating",
    question: `Create class Employee: employeeId(int), name(String), branch(String), rating(double), companyTransport(boolean)

Implement:
1. findCountOfEmployeesUsingCompTransport — count employees using company transport in given branch. Return 0 if none.
2. findEmployeeWithSecondHighestRating — return Employee with 2nd highest rating among those NOT using company transport. Return null if all use transport.

Print count or "No such Employees". Print employeeId+name or "All Employees using company transport".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "1001\nAshwa\nIT\n5\ntrue\n1002\nPreeti\nIT\n4\ntrue\n1003\nUma\nAdmin\n3\nfalse\n1004\nAkash\nHardware\n4.5\nfalse\nIT",
    output: "2\n1003\nUma",
    examples: [],
    answer: {
      explanation: "Count employees with transport=true and matching branch. For 2nd highest: filter transport=false, sort desc by rating, return index 1.",
      code: `import java.util.*;
public class IPA10 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Employee[] emp = new Employee[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            double d = sc.nextDouble(); sc.nextLine(); boolean e = sc.nextBoolean(); sc.nextLine();
            emp[i] = new Employee(a, b, c, d, e);
        }
        String br = sc.nextLine();
        int ans1 = CountOfEmployee(emp, br);
        System.out.println(ans1 != 0 ? ans1 : "No such Employees");
        Employee[] ans2 = EmployeeWithSecondHighestRating(emp);
        if (ans2 != null) {
            for (int i = 0; i < ans2.length; i++)
                if (ans2[i].getRating() > ans2[i+1].getRating()) { System.out.println(ans2[i+1].getId()); System.out.println(ans2[i+1].getName()); break; }
        } else System.out.println("All Employees using company transport");
    }
    public static int CountOfEmployee(Employee[] e, String b) {
        int count = 0;
        for (Employee em : e) if (em.getBranch().equalsIgnoreCase(b) && em.getTransport()) count++;
        return count;
    }
    public static Employee[] EmployeeWithSecondHighestRating(Employee[] e) {
        Employee[] sec = new Employee[0];
        for (Employee em : e) if (!em.getTransport()) { sec = Arrays.copyOf(sec, sec.length+1); sec[sec.length-1] = em; }
        for (int i = 0; i < sec.length; i++)
            for (int j = i; j < sec.length; j++)
                if (sec[i].getRating() < sec[j].getRating()) { Employee t = sec[i]; sec[i] = sec[j]; sec[j] = t; }
        return sec.length > 0 ? sec : null;
    }
}
class Employee {
    private int Id; private String name, branch; private double rating; private boolean transport;
    public Employee(int Id, String name, String branch, double rating, boolean transport) {
        this.Id=Id; this.name=name; this.branch=branch; this.rating=rating; this.transport=transport;
    }
    public int getId() { return Id; } public String getName() { return name; }
    public String getBranch() { return branch; } public double getRating() { return rating; }
    public boolean getTransport() { return transport; }
}`
    },
    sourceFile: "IPA10/IPA10.java"
  },

  {
    id: 10,
    title: "IPA11 — Player: Points for Skill & Player by Level",
    question: `Create class Player: playerId(int), skill(String), level(String), points(int)

Implement:
1. findPointsForGivenSkill — sum of points for given skill. Return 0 if not found.
2. getPlayerBasedOnLevel — return playerId where skill+level match AND points>=20. Return 0 if not found.

Print points or "The given Skill is not available". Print playerId or "No player is available with specified level, skill and eligibility points".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "101\nCricket\nBasic\n20\n102\nCricket\nIntermediate\n25\n111\nFootball\nIntermediate\n50\n113\nBaseBall\nAdvanced\n100\nCricket\nIntermediate",
    output: "45\n102",
    examples: [],
    answer: {
      explanation: "Sum points where skill matches. Search where skill+level match and points >= 20.",
      code: `import java.util.*;
public class IPA11 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        PlayerIPA[] p = new PlayerIPA[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            p[i] = new PlayerIPA(a, b, c, d);
        }
        String s = sc.nextLine(), l = sc.nextLine();
        int ans1 = findPointsForGivenSkill(p, s);
        System.out.println(ans1 != 0 ? ans1 : "The given Skill is not available");
        int ans2 = getPlayerBasedOnLevel(p, s, l);
        System.out.println(ans2 != 0 ? ans2 : "No player is available with specified level, skill and eligibility points");
    }
    public static int findPointsForGivenSkill(PlayerIPA[] p, String s) {
        int sum = 0;
        for (PlayerIPA pl : p) if (pl.getSkill().equalsIgnoreCase(s)) sum += pl.getPoints();
        return sum;
    }
    public static int getPlayerBasedOnLevel(PlayerIPA[] p, String s, String l) {
        for (PlayerIPA pl : p)
            if (pl.getSkill().equalsIgnoreCase(s) && pl.getLevel().equalsIgnoreCase(l) && pl.getPoints() >= 20)
                return pl.getPlayerId();
        return 0;
    }
}
class PlayerIPA {
    private int playerId, points; private String skill, level;
    public PlayerIPA(int playerId, String skill, String level, int points) {
        this.playerId=playerId; this.skill=skill; this.level=level; this.points=points;
    }
    public int getPlayerId() { return playerId; } public String getSkill() { return skill; }
    public String getLevel() { return level; } public int getPoints() { return points; }
}`
    },
    sourceFile: "IPA11/IPA11.java"
  },

  {
    id: 11,
    title: "IPA12 — Medicine: Get Sorted Prices by Disease",
    question: `Create class Medicine: medicineName(String), batch(String), disease(String), price(int)

Implement:
getPriceByDisease — returns int[] of sorted prices where disease matches (case-insensitive). Return null if not found.

Print each price on new line or "No medicine found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "dolo650\nFAC124W\nfever\n100\nparacetamol\nPAC545B\nbodypain\n150\nalmox\nALM747S\nfever\n200\naspirin\nASP849Q\nflu\n250\nfever",
    output: "100\n200",
    examples: [],
    answer: {
      explanation: "Collect prices matching disease, sort the array, return sorted int[].",
      code: `import java.util.*;
public class IPA12 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Medicine[] m = new Medicine[4];
        for (int i = 0; i < 4; i++) {
            String a = sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            m[i] = new Medicine(a, b, c, d);
        }
        String dis = sc.nextLine();
        int[] ans = getPriceByDisease(m, dis);
        if (ans != null) for (int p : ans) System.out.println(p);
        else System.out.println("No medicine found");
    }
    public static int[] getPriceByDisease(Medicine[] m, String dis) {
        int[] p = new int[0];
        for (Medicine med : m)
            if (med.getDisease().equalsIgnoreCase(dis)) { p = Arrays.copyOf(p, p.length+1); p[p.length-1] = med.getPrice(); Arrays.sort(p); }
        return p.length > 0 ? p : null;
    }
}
class Medicine {
    String name, batch, disease; int price;
    public Medicine(String name, String batch, String disease, int price) {
        this.name=name; this.batch=batch; this.disease=disease; this.price=price;
    }
    public String getDisease() { return disease; } public int getPrice() { return price; }
}`
    },
    sourceFile: "IPA12/IPA12.java"
  },

  {
    id: 12,
    title: "IPA13 — AutonomousCar: Tests Passed by Env & Grade by Brand",
    question: `Create class AutonomousCar: carId(int), brand(String), noOfTestsConducted(int), noOfTestsPassed(int), environment(String)

Implement:
1. findTestPassedByEnv — sum of testsPassed for given environment. Return 0 if none.
2. updateCarGrade — return AutonomousCar[] matching brand, add grade: (passed*100/conducted)>=80→"A1", else→"B2". Return null if none.

Print sum or "There are no tests passed in this particular environment". Print brand::grade or "No Car is available with the specified brand".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "100\nTesla\n1000\n500\nHills\n200\nFord\n2000\n1500\nDesert\n300\nRoyce\n3000\n1700\nHills\n400\nMercedez\n1000\n400\nDesert\nDesert\nMercedez",
    output: "1900\nMercedez::B2",
    examples: [],
    answer: {
      explanation: "Sum testsPassed where environment matches. Filter by brand, compute rating=(passed*100/conducted), assign grade A1 or B2.",
      code: `import java.util.*;
public class IPA13 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        AutonomousCar[] au = new AutonomousCar[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine();
            int d = sc.nextInt(); sc.nextLine(); String e = sc.nextLine();
            au[i] = new AutonomousCar(a, b, c, d, e);
        }
        String en = sc.nextLine(), br = sc.nextLine();
        int ans1 = findTestPassedByEnv(au, en);
        System.out.println(ans1 != 0 ? ans1 : "There are no tests passed in this particular environment");
        AutonomousCar[] ans2 = updateCarGrade(au, br);
        if (ans2 != null)
            for (AutonomousCar a : ans2) {
                int grade = a.getPass()*100/a.getCon();
                System.out.println(a.getBrand()+"::"+(grade >= 80 ? "A1" : "B2"));
            }
        else System.out.println("No Car is available with the specified brand");
    }
    public static int findTestPassedByEnv(AutonomousCar[] au, String en) {
        int sum = 0;
        for (AutonomousCar a : au) if (a.getEnv().equalsIgnoreCase(en)) sum += a.getPass();
        return sum;
    }
    public static AutonomousCar[] updateCarGrade(AutonomousCar[] au, String br) {
        AutonomousCar[] arr = new AutonomousCar[0];
        for (AutonomousCar a : au) if (a.getBrand().equalsIgnoreCase(br)) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = a; }
        return arr.length > 0 ? arr : null;
    }
}
class AutonomousCar {
    private int id, con, pass; private String brand, env;
    public AutonomousCar(int id, String brand, int con, int pass, String env) {
        this.id=id; this.brand=brand; this.con=con; this.pass=pass; this.env=env;
    }
    public String getBrand() { return brand; } public int getCon() { return con; }
    public int getPass() { return pass; } public String getEnv() { return env; }
}`
    },
    sourceFile: "IPA13/IPA13.java"
  },

  {
    id: 13,
    title: "IPA14 — Movie: Get Movies by Genre with Budget Label",
    question: `Create class Movie: movieName(String), company(String), genre(String), budget(int)

Implement:
getMovieByGenre — return String[] with "High Budget Movie" if budget > 80000000, else "Low Budget Movie", for all movies matching genre (case-insensitive).

Print each label on new line.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "aaa\nMarvel\nAction\n250000000\nbbb\nMarvel\nComedy\n25000000\nccc\nMarvel\nComedy\n2000000\nddd\nMarvel\nAction\n300000000\nAction",
    output: "High Budget Movie\nHigh Budget Movie",
    examples: [],
    answer: {
      explanation: "Filter movies by genre, for each check budget > 80M → High Budget Movie, else Low Budget Movie.",
      code: `import java.util.*;
public class IPA14 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Movie[] m = new Movie[4];
        for (int i = 0; i < 4; i++) {
            String a = sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            m[i] = new Movie(a, b, c, d);
        }
        String search = sc.nextLine();
        String[] ans1 = getMovieByGenre(m, search);
        for (String s : ans1) System.out.println(s);
    }
    public static String[] getMovieByGenre(Movie[] m, String s) {
        String[] arr = new String[0];
        for (Movie mv : m)
            if (mv.getGenre().equalsIgnoreCase(s)) {
                arr = Arrays.copyOf(arr, arr.length+1);
                arr[arr.length-1] = mv.getBudget() > 80000000 ? "High Budget Movie" : "Low Budget Movie";
            }
        return arr;
    }
}
class Movie {
    String mname, company, genre; int budget;
    public Movie(String mname, String company, String genre, int budget) {
        this.mname=mname; this.company=company; this.genre=genre; this.budget=budget;
    }
    public String getGenre() { return genre; } public int getBudget() { return budget; }
}`
    },
    sourceFile: "IPA14/IPA14.java"
  },

  {
    id: 14,
    title: "IPA15 — Phone: Total Price by Brand & Phone by OS+Price",
    question: `Create class Phone: phoneId(int), os(String), brand(String), price(int)

Implement:
1. findPriceForGivenBrand — sum of prices for given brand. Return 0 if not found.
2. getPhoneIdBasedOnOs — return phoneId where os matches AND price >= 50000. Return 0 if not found.

Print sum or "The given Brand is not available". Print phoneId or "No phones are available with specified os and price range".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "111\niOS\nApple\n30000\n222\nandroid\nSamsung\n50000\n333\nSymbian\nHTC\n12000\n444\nParanoid\nHTC\n89000\nBlackberry\naNdRoid",
    output: "The given Brand is not available\n222",
    examples: [],
    answer: {
      explanation: "Sum prices where brand matches. Search for phone where os matches and price >= 50000.",
      code: `import java.util.*;
public class IPA15 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Phone[] ph = new Phone[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            ph[i] = new Phone(a, b, c, d);
        }
        String br = sc.nextLine(), os = sc.nextLine();
        int ans1 = findPriceForGivenBrand(ph, br);
        System.out.println(ans1 != 0 ? ans1 : "The brand is not available");
        int ans2 = getPhoneIdBasedOnOs(ph, os);
        System.out.println(ans2 != 0 ? ans2 : "No phones are available with specified os and price range");
    }
    public static int findPriceForGivenBrand(Phone[] p, String br) {
        int sum = 0;
        for (Phone ph : p) if (ph.getBrand().equalsIgnoreCase(br)) sum += ph.getPrice();
        return sum;
    }
    public static int getPhoneIdBasedOnOs(Phone[] p, String os) {
        for (Phone ph : p) if (ph.getOs().equalsIgnoreCase(os) && ph.getPrice() >= 50000) return ph.getId();
        return 0;
    }
}
class Phone {
    int id, price; String os, brand;
    public Phone(int id, String os, String brand, int price) { this.id=id; this.os=os; this.brand=brand; this.price=price; }
    public int getId() { return id; } public String getOs() { return os; }
    public String getBrand() { return brand; } public int getPrice() { return price; }
}`
    },
    sourceFile: "IPA15/IPA15.java"
  },

  {
    id: 15,
    title: "IPA16 — NavalVessel: Avg Voyages by % & Grade by Purpose",
    question: `Create class NavalVessel: vesselId(int), vesselName(String), noOfVoyagesPlanned(int), noOfVoyagesCompleted(int), purpose(String)

Implement:
1. findAvgVoyagesByPct — return avg of voyagesCompleted where (completed*100/planned) >= given %. Return 0 if none.
2. findVesselByGrade — return NavalVessel[] matching purpose. Compute grade: 100%→Star, 80-99%→Leader, 55-79%→Inspirer, else→Striver.

Print avg or nothing. Print name%grade for each or "No Naval Vessel is available with the specified purpose".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Hard",
    tags: ["OOP", "Arrays"],
    input: "111\nRojer\n100\n100\nPassenger\n222\nKalam\n200\n100\nGoods\n333\nYashwin\n400\n300\nArmy\n444\nThanishwini\n500\n500\nWelfare\n75\nArmy",
    output: "300\nYashwin%Inspirer",
    examples: [],
    answer: {
      explanation: "Filter vessels where (completed*100/planned) >= %, compute avg. For grade, calculate percentage and assign classification.",
      code: `import java.util.*;
public class IPA16 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        NavalVessel[] n = new NavalVessel[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine();
            int c = sc.nextInt(); sc.nextLine(); int d = sc.nextInt(); sc.nextLine(); String e = sc.nextLine();
            n[i] = new NavalVessel(a, b, c, d, e);
        }
        int perc = sc.nextInt(); sc.nextLine(); String pur = sc.nextLine();
        int ans1 = findAvgVoyagesByPct(n, perc);
        if (ans1 != 0) System.out.println(ans1);
        NavalVessel[] ans2 = findVesselByGrade(n, pur);
        if (ans2 != null)
            for (NavalVessel v : ans2) {
                int per = v.getComp()*100/v.getPlan();
                String grade = per == 100 ? "Star" : per >= 80 ? "Leader" : per >= 55 ? "Inspirer" : "Striver";
                System.out.println(v.getName()+"%"+grade);
            }
        else System.out.println("No Naval Vessel is available with the specified purpose");
    }
    public static int findAvgVoyagesByPct(NavalVessel[] n, int p) {
        int count = 0, sum = 0;
        for (NavalVessel v : n) if (v.getComp()*100/v.getPlan() >= p) { sum += v.getComp(); count++; }
        return count > 0 ? sum/count : 0;
    }
    public static NavalVessel[] findVesselByGrade(NavalVessel[] n, String p) {
        NavalVessel[] arr = new NavalVessel[0];
        for (NavalVessel v : n) if (v.getPurpose().equalsIgnoreCase(p)) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = v; }
        return arr.length > 0 ? arr : null;
    }
}
class NavalVessel {
    int id, plan, comp; String name, purpose;
    public NavalVessel(int id, String name, int plan, int comp, String purpose) {
        this.id=id; this.name=name; this.plan=plan; this.comp=comp; this.purpose=purpose;
    }
    public int getPlan() { return plan; } public int getComp() { return comp; }
    public String getName() { return name; } public String getPurpose() { return purpose; }
}`
    },
    sourceFile: "IPA16/IPA16.java"
  },

  {
    id: 16,
    title: "IPA17 — Student: Find by Grade and Month",
    question: `Create class Student: rollNo(int), name(String), subject(String), grade(char), date(String DD/MM/YYYY)

Implement:
findStudentByGradeAndMonth — return Student[] sorted ascending by rollNo where grade and month match.

Print name, subject, total count or "No student found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "111\nArijit\nMath\nB\n22/09/2023\n101\nPriyanka\nEnglish\nA\n30/03/2022\n107\nShreosi\nHistory\nC\n13/05/2022\n105\nTatan\nPhysics\nA\n27/03/2022\nA\n3",
    output: "Priyanka\nEnglish\nTatan\nPhysics\n2",
    examples: [],
    answer: {
      explanation: "Parse month from date string (DD/MM/YYYY), compare with int month param. Filter by grade char and month, sort by rollNo ascending.",
      code: `import java.util.*;
public class IPA17 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Stu[] s = new Stu[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            char d = sc.nextLine().charAt(0); String e = sc.nextLine();
            String[] parts = e.split("/");
            s[i] = new Stu(a, b, c, d, parts[0], parts[1], parts[2]);
        }
        char g = sc.nextLine().charAt(0); int m = sc.nextInt(); sc.nextLine();
        Stu[] ans = findStudentByGradeAndMonth(s, g, m);
        if (ans != null) { for (Stu st : ans) { System.out.println(st.getName()); System.out.println(st.getSub()); } System.out.println(ans.length); }
        else System.out.println("No student found");
    }
    public static Stu[] findStudentByGradeAndMonth(Stu[] s, char g, int m) {
        Stu[] arr = new Stu[0];
        for (Stu st : s)
            if (st.getGrade() == g && Integer.parseInt(st.getMonth()) == m) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = st; }
        for (int i = 0; i < arr.length-1; i++)
            for (int j = i+1; j < arr.length; j++)
                if (arr[i].getRoll() > arr[j].getRoll()) { Stu t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
        return arr.length > 0 ? arr : null;
    }
}
class Stu {
    private int roll; private String name, sub, day, month, year; private char grade;
    public Stu(int roll, String name, String sub, char grade, String day, String month, String year) {
        this.roll=roll; this.name=name; this.sub=sub; this.grade=grade; this.day=day; this.month=month; this.year=year;
    }
    public int getRoll() { return roll; } public String getName() { return name; }
    public String getSub() { return sub; } public String getMonth() { return month; }
    public char getGrade() { return grade; }
}`
    },
    sourceFile: "IPA17/IPA17.java"
  },

  {
    id: 17,
    title: "IPA18 — Antenna: Search by Name & Sort by VSWR",
    question: `Create class Antenna: antennaId(int), antennaName(String), projectLead(String), antennaVSWR(double)

Implement:
1. searchAntennaByName — return antennaId if name matches (case-insensitive). Return 0 if not found.
2. sortAntennaByVSWR — return Antenna[] sorted ascending by VSWR where VSWR < given value. Return null if none.

Print antennaId or "There is no antenna with the given parameter". Print projectLead for each or "No Antenna found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "111\nReconfigurable\nHema\n0.4\n222\nWearable\nKavya\n0.9\n333\nMicrostrip\nTeju\n0.3\n444\nDielectric\nSai\n0.65\nMicrostrip\n0.5",
    output: "333\nTeju\nHema",
    examples: [],
    answer: {
      explanation: "Search by name using equalsIgnoreCase. Filter VSWR < given value, sort ascending by VSWR, print project leads.",
      code: `import java.util.*;
public class IPA18 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Antenna[] an = new Antenna[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            double d = sc.nextDouble(); sc.nextLine();
            an[i] = new Antenna(a, b, c, d);
        }
        String str = sc.nextLine(); double num = sc.nextDouble();
        int res1 = search(an, str);
        System.out.println(res1 == 0 ? "There is no antenna with the given parameter" : res1);
        Antenna[] res2 = sortAntenna(an, num);
        if (res2 == null) System.out.println("No Antenna found");
        else for (Antenna a : res2) System.out.println(a.getLead());
    }
    public static int search(Antenna[] an, String s) {
        for (Antenna a : an) if (a.getName().equalsIgnoreCase(s)) return a.getId();
        return 0;
    }
    public static Antenna[] sortAntenna(Antenna[] an, double num) {
        Antenna[] a = new Antenna[0];
        for (Antenna ant : an) if (ant.getVSWR() < num) { a = Arrays.copyOf(a, a.length+1); a[a.length-1] = ant; }
        for (int i = 0; i < a.length; i++)
            for (int j = 0; j < a.length-i-1; j++)
                if (a[j].getVSWR() > a[j+1].getVSWR()) { Antenna t = a[j]; a[j] = a[j+1]; a[j+1] = t; }
        return a.length > 0 ? a : null;
    }
}
class Antenna {
    private int id; private String name, lead; private double VSWR;
    public Antenna(int id, String name, String lead, double VSWR) { this.id=id; this.name=name; this.lead=lead; this.VSWR=VSWR; }
    public int getId() { return id; } public String getName() { return name; }
    public String getLead() { return lead; } public double getVSWR() { return VSWR; }
}`
    },
    sourceFile: "IPA18/IPA18.java"
  },

  {
    id: 18,
    title: "IPA19 — Flower: Min Price by Type (rating > 3)",
    question: `Create class Flower: flowerId(int), flowerName(String), price(int), rating(int), type(String)

Implement:
findMinPriceByType — return flowerId of minimum priced flower where type matches AND rating > 3. Return 0 if none.

Print flowerId or "There is no flower with given type".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "123\nYellow trout lilly\n3000\n5\nephemerals\n345\nsnowdrop\n2500\n4\nephemerals\n321\nYarrow\n1000\n4\nperennials\n213\nred trillium\n2250\n4\nephemerals\nephemerals",
    output: "213",
    examples: [],
    answer: {
      explanation: "Filter flowers where type matches and rating > 3. Among those, find the one with minimum price.",
      code: `import java.util.*;
public class IPA19 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Flower[] fl = new Flower[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine();
            int c = sc.nextInt(); sc.nextLine(); int d = sc.nextInt(); sc.nextLine(); String e = sc.nextLine();
            fl[i] = new Flower(a, b, c, d, e);
        }
        String f = sc.nextLine();
        int id = findMinPriceByType(fl, f);
        System.out.println(id != 0 ? id : "There is no flower with given type");
    }
    public static int findMinPriceByType(Flower[] fl, String s) {
        Flower[] arr = new Flower[0];
        for (Flower f : fl)
            if (f.getType().equalsIgnoreCase(s) && f.getRating() > 3) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = f; }
        if (arr.length == 0) return 0;
        Flower mini = arr[0];
        for (Flower f : arr) if (mini.getPrice() > f.getPrice()) mini = f;
        return mini.getFlowerId();
    }
}
class Flower {
    private int flowerId, price, rating; private String flowerName, type;
    public Flower(int flowerId, String flowerName, int price, int rating, String type) {
        this.flowerId=flowerId; this.flowerName=flowerName; this.price=price; this.rating=rating; this.type=type;
    }
    public int getFlowerId() { return flowerId; } public int getPrice() { return price; }
    public int getRating() { return rating; } public String getType() { return type; }
}`
    },
    sourceFile: "IPA19/IPA19.java"
  },

  {
    id: 19,
    title: "IPA20 — Engine: Avg Price by Type & Search by Name",
    question: `Create class Engine: engineId(int), engineName(String), engineType(String), enginePrice(double)

Implement:
1. findAvgEnginePriceByType — return avg price (int) for given engine type. Return 0 if not found.
2. searchEngineByName — return Engine[] sorted ascending by engineId matching name. Return null if not found.

Print avg or "There are no engine with given type". Print engineId for each or "There are no engine with the given name".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "1001\nMaruti\nDiesel\n20000\n1002\nKia\nPertro\n17000\n1003\nHyundai\nDiesel\n24000\n1000\nMaruti\nPetrol\n27500\nPetrol\nMaruti",
    output: "27500\n1000\n1001",
    examples: [],
    answer: {
      explanation: "Sum and count by type for avg. Filter by name, sort by id ascending, print ids.",
      code: `import java.util.*;
public class IPA20 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Engine[] eng = new Engine[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            double d = sc.nextDouble(); sc.nextLine();
            eng[i] = new Engine(a, b, c, d);
        }
        String t = sc.nextLine(), n = sc.nextLine();
        int ans1 = findAvgEnginePriceByType(eng, t);
        System.out.println(ans1 != 0 ? ans1 : "There are no engine with given type");
        Engine[] ans2 = searchEngineByName(eng, n);
        if (ans2 != null) for (Engine e : ans2) System.out.println(e.getId());
    }
    public static int findAvgEnginePriceByType(Engine[] e, String t) {
        int sum = 0, count = 0;
        for (Engine en : e) if (en.getType().equalsIgnoreCase(t)) { sum += en.getPrice(); count++; }
        return count > 0 ? sum/count : 0;
    }
    public static Engine[] searchEngineByName(Engine[] e, String n) {
        Engine[] arr = new Engine[0];
        for (Engine en : e) if (en.getName().equalsIgnoreCase(n)) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = en; }
        for (int i = 0; i < arr.length-1; i++)
            for (int j = i+1; j < arr.length; j++)
                if (arr[i].getId() > arr[j].getId()) { Engine t2 = arr[i]; arr[i] = arr[j]; arr[j] = t2; }
        return arr.length > 0 ? arr : null;
    }
}
class Engine {
    private int id; private String name, type; private double price;
    public Engine(int id, String name, String type, double price) { this.id=id; this.name=name; this.type=type; this.price=price; }
    public int getId() { return id; } public String getName() { return name; }
    public String getType() { return type; } public double getPrice() { return price; }
}`
    },
    sourceFile: "IPA20/IPA20.java"
  },

  {
    id: 20,
    title: "IPA21 — Fruits: Max Price Fruit ID by Rating",
    question: `Create class Fruits: fruitId(int), fruitName(String), price(int), rating(int)

Implement:
findMaximumPriceByRating — return fruitId of max priced fruit where rating > given rating. Return 0 if none.

Print fruitId or "No such Fruit".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "555\nApple\n200\n5\n777\nOrange\n150\n4\n333\nBanana\n100\n4\n888\nAvocado\n250\n4\n3",
    output: "888",
    examples: [],
    answer: {
      explanation: "Filter fruits with rating > r, find max price among them, return corresponding fruitId.",
      code: `import java.util.*;
public class IPA21 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Fruits[] ft = new Fruits[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            ft[i] = new Fruits(a, b, c, d);
        }
        int rate = sc.nextInt(); sc.nextLine();
        int ans = findMaximumPriceByRating(ft, rate);
        System.out.println(ans != 0 ? ans : "No such Fruit");
    }
    public static int findMaximumPriceByRating(Fruits[] ft, int r) {
        int max = 0;
        for (Fruits f : ft) if (f.getRating() > r && f.getPrice() > max) max = f.getPrice();
        for (Fruits f : ft) if (f.getPrice() == max) return f.getId();
        return 0;
    }
}
class Fruits {
    private int id, price, rating; private String name;
    public Fruits(int id, String name, int price, int rating) { this.id=id; this.name=name; this.price=price; this.rating=rating; }
    public int getId() { return id; } public int getPrice() { return price; } public int getRating() { return rating; }
}`
    },
    sourceFile: "IPA21/IPA21.java"
  },

  {
    id: 21,
    title: "IPA22 — Associate: Filter by Technology & Experience (Multiple of 5)",
    question: `Create class Associate: id(int), name(String), technology(String), experienceInYears(int)

Implement:
associatesForGivenTechnology — return Associate[] where technology matches AND experienceInYears is a multiple of 5.

Print id for each or nothing if null.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "101\nAlex\nJava\n15\n102\nAlbert\nUnix\n20\n103\nAlferd\nTesting\n13\n104\nAlfa\nJava\n15\n105\nAlmas\nJava\n29\nJava",
    output: "101\n104",
    examples: [],
    answer: {
      explanation: "Filter associates where technology matches (case-insensitive) and experienceInYears % 5 == 0.",
      code: `import java.util.*;
public class IPA22 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Associate[] as = new Associate[5];
        for (int i = 0; i < 5; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            as[i] = new Associate(a, b, c, d);
        }
        String st = sc.nextLine();
        Associate[] ans = associatesForGivenTechnology(as, st);
        if (ans != null) for (Associate a : ans) System.out.println(a.getId());
    }
    public static Associate[] associatesForGivenTechnology(Associate[] a, String s) {
        Associate[] arr = new Associate[0];
        for (Associate as : a)
            if (as.getTech().equalsIgnoreCase(s) && as.getYear() % 5 == 0) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = as; }
        return arr.length > 0 ? arr : null;
    }
}
class Associate {
    private int id, year; private String name, tech;
    public Associate(int id, String name, String tech, int year) { this.id=id; this.name=name; this.tech=tech; this.year=year; }
    public int getId() { return id; } public String getTech() { return tech; } public int getYear() { return year; }
}`
    },
    sourceFile: "IPA22/IPA22.java"
  },

  {
    id: 22,
    title: "IPA23 — Institute: Cleared by Location & Grade by Name",
    question: `Create class Institution: institutionId(int), institutionName(String), noOfStudentsPlaced(int), noOfStudentsCleared(int), location(String), grade(String)

Implement:
1. FindNumClearancedByLoc — sum of noOfStudentsCleared for given location. Return 0 if none.
2. UpdateInstitutionGrade — return Institution[] matching name, grade = (placed*100/cleared)>=80→"A", else→"B".

Print sum or "There are no cleared students in this particular location". Print name::grade or "No Institute is available with the specified name".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "111\nAmrita\n5000\n10000\nChennai\n222\nKarunya\n16000\n20000\nCoimbatore\n333\nAppleTech\n10000\n12000\nChennai\n444\nAruna\n6000\n10000\nVellore\nChennai\nKarunya",
    output: "22000\nKarunya::A",
    examples: [],
    answer: {
      explanation: "Sum cleared where location matches. Filter by name, compute placed*100/cleared, assign A or B grade.",
      code: `import java.util.*;
public class IPA23 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Institute[] in = new Institute[4];
        for (int j = 0; j < 4; j++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine();
            int d = sc.nextInt(); sc.nextLine(); String e = sc.nextLine();
            in[j] = new Institute(a, b, c, d, e);
        }
        String loc = sc.nextLine(), n = sc.nextLine();
        int ans1 = FindNumClearancedByLoc(in, loc);
        System.out.println(ans1 != 0 ? ans1 : "There are no cleared students in this particular location");
        Institute[] ans2 = UpdateInstitutionGrade(in, n);
        if (ans2 != null)
            for (Institute inst : ans2) { double r = inst.getPlaced()*100/inst.getClear(); System.out.println(inst.getName()+"::"+(r >= 80 ? "A" : "B")); }
        else System.out.println("No Institute is available with the specified name");
    }
    public static int FindNumClearancedByLoc(Institute[] in, String l) {
        int sum = 0;
        for (Institute i : in) if (i.getLocation().equalsIgnoreCase(l)) sum += i.getClear();
        return sum;
    }
    public static Institute[] UpdateInstitutionGrade(Institute[] in, String n) {
        Institute[] arr = new Institute[0];
        for (Institute i : in) if (i.getName().equalsIgnoreCase(n)) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = i; }
        return arr.length > 0 ? arr : null;
    }
}
class Institute {
    private int id, placed, clear; private String name, location;
    public Institute(int id, String name, int placed, int clear, String location) {
        this.id=id; this.name=name; this.placed=placed; this.clear=clear; this.location=location;
    }
    public int getClear() { return clear; } public String getName() { return name; }
    public int getPlaced() { return placed; } public String getLocation() { return location; }
}`
    },
    sourceFile: "IPA23/IPA23.java"
  },

  {
    id: 23,
    title: "IPA24 — Inventory: Replenish by Threshold Limit",
    question: `Create class Inventory: inventoryId(String), maximumQuantity(int), currentQuantity(int), threshold(int)

Implement:
Replenish — return Inventory[] where limit >= threshold.

Print id + label: threshold>75→"Critical Falling", 50-75→"Moderate Filling", else→"Non-Critical Filling".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "1\n100\n50\n50\n2\n200\n60\n40\n3\n150\n35\n45\n4\n80\n45\n40\n45",
    output: "2 Non-Critical Filling\n3 Non-Critical Filling\n4 Non-Critical Filling",
    examples: [],
    answer: {
      explanation: "Filter inventory where limit >= threshold. For each, check threshold ranges and print label.",
      code: `import java.util.*;
public class IPA24 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Inventory[] in = new Inventory[4];
        for (int i = 0; i < 4; i++) {
            String a = sc.nextLine(); int b = sc.nextInt(); sc.nextLine(); int c = sc.nextInt(); sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            in[i] = new Inventory(a, b, c, d);
        }
        int lim = sc.nextInt();
        Inventory[] ans = Replenish(in, lim);
        if (ans != null)
            for (Inventory inv : ans) {
                String label = inv.getTh() > 75 ? "Critical Falling" : inv.getTh() >= 50 ? "Moderate Filling" : "Non-Critical Filling";
                System.out.println(inv.getId()+" "+label);
            }
    }
    public static Inventory[] Replenish(Inventory[] in, int lim) {
        Inventory[] arr = new Inventory[0];
        for (Inventory inv : in) if (lim >= inv.getTh()) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = inv; }
        return arr.length > 0 ? arr : null;
    }
}
class Inventory {
    private String id; private int max, cur, th;
    public Inventory(String id, int max, int cur, int th) { this.id=id; this.max=max; this.cur=cur; this.th=th; }
    public String getId() { return id; } public int getTh() { return th; }
}`
    },
    sourceFile: "IPA24/IPA24.java"
  },

  {
    id: 24,
    title: "IPA25 — Cinema: Avg Budget by Director & Movie by Rating+Budget",
    question: `Create class Cinema: movieId(int), director(String), rating(int), budget(int)

Implement:
1. findAvgBudgetByDirector — return avg budget (int) for given director. Return 0 if not found.
2. getMovieByRatingBudget — return movieId where budget AND rating match AND budget % rating == 0. Return 0 if none.

Print avg or "Sorry - The given director has not yet directed any movie". Print movieId or "Sorry - No movie is available...".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "1101\nGVM\n4\n100\n1201\nShankar\n5\n500\n1301\nShankar\n3\n50\n1401\nGVM\n5\n300\nGVM\n5\n300",
    output: "200\n1401",
    examples: [],
    answer: {
      explanation: "Sum budgets for director, divide by count. Search movie where rating, budget match and budget % rating == 0.",
      code: `import java.util.*;
public class IPA25 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Cinema[] cn = new Cinema[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            cn[i] = new Cinema(a, b, c, d);
        }
        String dir = sc.nextLine(); int rate = sc.nextInt(); sc.nextLine(); int bud = sc.nextInt(); sc.nextLine();
        int ans1 = findAvgBudgetByDirector(cn, dir);
        System.out.println(ans1 != 0 ? ans1 : "Sorry - The given director has not yet directed any movie");
        int ans2 = getMovieByRatingBudget(cn, rate, bud);
        System.out.println(ans2 != 0 ? ans2 : "Sorry - No movie is available with the specified rating and budget requirement");
    }
    public static int findAvgBudgetByDirector(Cinema[] cn, String dir) {
        int sum = 0, count = 0;
        for (Cinema c : cn) if (c.getDirector().equalsIgnoreCase(dir)) { sum += c.getBudget(); count++; }
        return count > 0 ? sum/count : 0;
    }
    public static int getMovieByRatingBudget(Cinema[] cn, int r, int b) {
        for (Cinema c : cn) if (c.getBudget() == b && c.getRating() == r && b % r == 0) return c.getId();
        return 0;
    }
}
class Cinema {
    private int id, rating, budget; private String director;
    public Cinema(int id, String director, int rating, int budget) { this.id=id; this.director=director; this.rating=rating; this.budget=budget; }
    public int getId() { return id; } public String getDirector() { return director; }
    public int getRating() { return rating; } public int getBudget() { return budget; }
}`
    },
    sourceFile: "IPA25/IPA25.java"
  },

  {
    id: 25,
    title: "IPA26 — Player: Grade by Average Runs",
    question: `Create class Player: id(int), name(String), iccRank(int), matchesPlayed(int), runsScored(int)

Implement:
findAverageOfRuns — return double[] of avg runs for players where matchesPlayed >= target.

Print Grade A (80-100), Grade B (50-79), Grade C (else) for each.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "100\nSachin\n5\n150\n13000\n101\nSehwag\n4\n120\n10000\n103\nDhoni\n7\n110\n7000\n104\nKohli\n15\n57\n4400\n100",
    output: "Grade A\nGrade A\nGrade B",
    examples: [],
    answer: {
      explanation: "Filter players where matchesPlayed >= target. Compute avg = runs/matches. Classify into Grade A/B/C.",
      code: `import java.util.*;
public class IPA26 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Player2[] pl = new Player2[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine();
            int d = sc.nextInt(); sc.nextLine(); int e = sc.nextInt(); sc.nextLine();
            pl[i] = new Player2(a, b, c, d, e);
        }
        int target = sc.nextInt(); sc.nextLine();
        double[] ans = findAverageOfRuns(pl, target);
        if (ans != null)
            for (double avg : ans)
                System.out.println(avg >= 80 && avg <= 100 ? "Grade A" : avg >= 50 ? "Grade B" : "Grade C");
    }
    public static double[] findAverageOfRuns(Player2[] p, int t) {
        double[] arr = new double[0];
        for (Player2 pl : p)
            if (t <= pl.getMatch()) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = (double)pl.getRun()/pl.getMatch(); }
        return arr.length > 0 ? arr : null;
    }
}
class Player2 {
    private int id, rank, match, run; private String name;
    public Player2(int id, String name, int rank, int match, int run) { this.id=id; this.name=name; this.rank=rank; this.match=match; this.run=run; }
    public int getMatch() { return match; } public int getRun() { return run; }
}`
    },
    sourceFile: "IPA26/IPA26.java"
  },

  {
    id: 26,
    title: "IPA27 — Sim: Match Circle & Sort by Balance",
    question: `Create class Sim: id(int), company(String), balance(int), ratePerSecond(double), circle(String)

Implement:
matchAndSort — return Sim[] where circle matches AND search_rate > ratePerSecond, sorted descending by balance.

Print id for each or nothing if null.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "1\njio\n430\n1.32\nmumbai\n2\nidea\n320\n2.26\nmumbai\n3\nairtel\n500\n2.54\nmumbai\n4\nvodafone\n640\n3.21\nmumbai\nmumbai\n3.4",
    output: "4\n3\n1\n2",
    examples: [],
    answer: {
      explanation: "Filter sims where circle matches and search_rate > ratePerSecond. Sort by balance descending.",
      code: `import java.util.*;
public class IPA27 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Sim2[] s = new Sim2[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine();
            double d = sc.nextDouble(); sc.nextLine(); String e = sc.nextLine();
            s[i] = new Sim2(a, b, c, d, e);
        }
        String cir = sc.nextLine(); double rate = sc.nextDouble(); sc.nextLine();
        Sim2[] ans = matchAndSort(s, cir, rate);
        if (ans != null) for (Sim2 sim : ans) System.out.println(sim.getId());
    }
    public static Sim2[] matchAndSort(Sim2[] s, String c, double r) {
        Sim2[] id = new Sim2[0];
        for (Sim2 sim : s)
            if (sim.getCircle().equalsIgnoreCase(c) && r > sim.getRps()) { id = Arrays.copyOf(id, id.length+1); id[id.length-1] = sim; }
        for (int i = 0; i < id.length-1; i++)
            for (int j = i+1; j < id.length; j++)
                if (id[i].getBalance() < id[j].getBalance()) { Sim2 t = id[i]; id[i] = id[j]; id[j] = t; }
        return id.length > 0 ? id : null;
    }
}
class Sim2 {
    private int id, balance; private String company, circle; private double rps;
    public Sim2(int id, String company, int balance, double rps, String circle) { this.id=id; this.company=company; this.balance=balance; this.rps=rps; this.circle=circle; }
    public int getId() { return id; } public int getBalance() { return balance; }
    public double getRps() { return rps; } public String getCircle() { return circle; }
}`
    },
    sourceFile: "IPA27/IPA27.java"
  },

  {
    id: 27,
    title: "IPA28 — Team: Find Team by Country & Runs",
    question: `Create class Team: tId(int), tName(String), tCountry(String), tRun(int)

Implement:
findPlayer — return Team where country matches (case-insensitive) AND run > given run. Return null if not found.

Print tId, tName, tCountry, tRun or "No team is found from the given country and run".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "3\n1\nArijit\nIndia\n43\n2\nDoremon\nChina\n40\n3\nDonal\nEngland\n32\n35\nChina",
    output: "2\nDoremon\nChina\n40",
    examples: [],
    answer: {
      explanation: "Search team where country matches (ignoreCase) and run > given run. Return first match.",
      code: `import java.util.*;
public class IPA28 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        Team[] t = new Team[n];
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt();
            t[i] = new Team(a, b, c, d);
        }
        int r = sc.nextInt(); sc.nextLine(); String con = sc.nextLine();
        Team ans = findPlayer(t, r, con);
        if (ans != null) { System.out.println(ans.gettId()); System.out.println(ans.gettName()); System.out.println(ans.gettCountry()); System.out.println(ans.gettRun()); }
        else System.out.println("No team is found from the given country and run");
    }
    public static Team findPlayer(Team[] t, int r, String c) {
        for (Team team : t) if (team.gettCountry().equalsIgnoreCase(c) && team.gettRun() > r) return team;
        return null;
    }
}
class Team {
    private int tId, tRun; private String tName, tCountry;
    public Team(int tId, String tName, String tCountry, int tRun) { this.tId=tId; this.tName=tName; this.tCountry=tCountry; this.tRun=tRun; }
    public int gettId() { return tId; } public String gettName() { return tName; }
    public String gettCountry() { return tCountry; } public int gettRun() { return tRun; }
}`
    },
    sourceFile: "IPA28/IPA28.java"
  },

  {
    id: 28,
    title: "IPA29 — Account: Calculate Interest",
    question: `Create a class Account with attributes: id(int), balance(double), interestRate(double)

Implement:
calculateInterest — takes Account object and int years. Calculate:
percentage = (interestRate/100) * years
totalInterest = interestRate + percentage

Return total interest. Print formatted to 3 decimal places.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Math"],
    input: "1001\n5000\n10.0\n2",
    output: "12.000",
    examples: [{ input: "1001\n5000\n10.0\n2", output: "12.000" }],
    answer: {
      explanation: "percentage = (rate/100)*years. totalInterest = rate + percentage. Print with 3 decimal places.",
      code: `import java.util.*;
public class Calculate_Interest {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(); sc.nextLine();
        double b = sc.nextDouble(); sc.nextLine();
        double c = sc.nextDouble(); sc.nextLine();
        Account ac = new Account(a, b, c);
        int n = sc.nextInt();
        double interest = calculateInterest(ac, n);
        System.out.format("%.3f", interest);
    }
    public static double calculateInterest(Account ac, int n) {
        double per = (ac.getInterestRate() / 100) * n;
        return ac.getInterestRate() + per;
    }
}
class Account {
    int id; double balance, interestRate;
    public Account(int id, double balance, double interestRate) {
        this.id=id; this.balance=balance; this.interestRate=interestRate;
    }
    public double getInterestRate() { return interestRate; }
}`
    },
    sourceFile: "IPA29/Calculate_Interest.java"
  },

  {
    id: 29,
    title: "IPA30 — Document: Filter Docs with Odd Pages",
    question: `Create class Document: id(int), title(String), folderName(String), pages(int)

Implement:
docsWithOddPages — return Document[] containing only documents with odd number of pages, sorted ascending by id. Return null if none.

Print "id title folderName pages" for each or "All pages are even".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "1\nresume\npersonal\n50\n2\nquestion1\nexams\n55\n3\nquestion2\nexams\n45\n4\nIndia\nmisc\n40",
    output: "2 question1 exams 55\n3 question2 exams 45",
    examples: [{ input: "...4 docs...", output: "2 question1 exams 55\n3 question2 exams 45" }],
    answer: {
      explanation: "Filter docs with pages%2!=0. Sort by id ascending using bubble sort. Print id, title, folderName, pages.",
      code: `import java.util.*;
public class DocsWithOddPagesByAssId {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Document[] doc = new Document[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt();
            doc[i] = new Document(a, b, c, d);
        }
        Document[] d = docWithOddPages(doc);
        if (d == null) System.out.println("All pages are even");
        else for (Document doc2 : d) System.out.println(doc2.getId()+" "+doc2.getTitle()+" "+doc2.getFolderName()+" "+doc2.getPages());
    }
    public static Document[] docWithOddPages(Document[] d) {
        Document[] st = new Document[0];
        for (Document doc : d) if (doc.getPages() % 2 != 0) { st = Arrays.copyOf(st, st.length+1); st[st.length-1] = doc; }
        for (int i = 0; i < st.length-1; i++)
            for (int j = i+1; j < st.length; j++)
                if (st[i].getId() > st[j].getId()) { Document k = st[i]; st[i] = st[j]; st[j] = k; }
        return st.length > 0 ? st : null;
    }
}
class Document {
    int id, pages; String title, folderName;
    public Document(int id, String title, String folderName, int pages) { this.id=id; this.title=title; this.folderName=folderName; this.pages=pages; }
    public int getId() { return id; } public String getTitle() { return title; }
    public String getFolderName() { return folderName; } public int getPages() { return pages; }
}`
    },
    sourceFile: "IPA30/DocsWithOddPagesByAssId.java"
  },

  {
    id: 30,
    title: "IPA31 — Music: Avg Count & Sort Playlist by Duration",
    question: `Create class Music: playListNo(int), type(String), count(int), duration(double)

Implement:
1. findAvgOfCount — return avg (int) of count for playlists where count > given int. Return 0 if none.
2. sortTypeByDuration — return String[] of playlist types sorted ascending by duration where duration > given double. Return null if none.

Print avg or "No playlist found". Print types or "No playlist found with mentioned attribute".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "111\nWorkOut\n10\n15.2\n321\nDance Party\n20\n55.500\n721\nChildhood Jams\n6\n50.60\n521\nChill\n30\n78.89\n15\n20",
    output: "25\nChildhood Jams\nDance Party\nChill",
    examples: [{ input: "...count>15, dur>20", output: "25\nChildhood Jams\nDance Party\nChill" }],
    answer: {
      explanation: "Sum and count where count > num for avg. Filter by duration > d, sort by duration ascending, collect types.",
      code: `import java.util.*;
public class Music_IPA {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Music[] m = new Music[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine(); double d = sc.nextDouble(); sc.nextLine();
            m[i] = new Music(a, b, c, d);
        }
        int num = sc.nextInt(); sc.nextLine(); double dur = sc.nextDouble(); sc.nextLine();
        int ans1 = findAvg(m, num);
        System.out.println(ans1 != 0 ? ans1 : "No playlist found");
        String[] ans2 = SortDur(m, dur);
        if (ans2 != null) for (String t : ans2) System.out.println(t);
        else System.out.println("No playlist found with mentioned attribute");
    }
    public static int findAvg(Music[] m, int num) {
        int k = 0, sum = 0;
        for (Music ms : m) if (ms.getCount() > num) { sum += ms.getCount(); k++; }
        return k > 0 ? sum/k : 0;
    }
    public static String[] SortDur(Music[] m, double d) {
        String[] t = new String[0]; double[] du = new double[0];
        for (Music ms : m) if (ms.getDuration() > d) { du = Arrays.copyOf(du, du.length+1); du[du.length-1] = ms.getDuration(); Arrays.sort(du); }
        for (double v : du) for (Music ms : m) if (ms.getDuration() == v) { t = Arrays.copyOf(t, t.length+1); t[t.length-1] = ms.getType(); }
        return t.length > 0 ? t : null;
    }
}
class Music {
    int pNo, count; String type; double duration;
    public Music(int pNo, String type, int count, double duration) { this.pNo=pNo; this.type=type; this.count=count; this.duration=duration; }
    public String getType() { return type; } public int getCount() { return count; } public double getDuration() { return duration; }
}`
    },
    sourceFile: "IPA31/Music_IPA.java"
  },

  {
    id: 31,
    title: "IPA32 — TravelAgencies: Highest Package Price & Agency by ID+Type",
    question: `Create class TravelAgencies: regNo(int), agencyName(String), packageType(String), price(int), flightFacility(boolean)

Implement:
1. findAgencyWithHighestPackagePrice — return highest package price (int).
2. agencyDetailsForGivenIdAndType — return TravelAgencies where flightFacility=true AND regNo matches AND packageType matches (case-insensitive).

Print highest price. Print agencyName:price or nothing if null.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "123\nA2Z Agency\nPlatinum\n50000\ntrue\n345\nSSS Agency\nGold\n30000\nfalse\n987\nCox and Kings\nDiamond\n40000\ntrue\n888\nGlobal Tours\nSilver\n20000\nfalse\n987\nDiamond",
    output: "50000\nCox and Kings:40000",
    examples: [{ input: "...4 agencies, find 987/Diamond", output: "50000\nCox and Kings:40000" }],
    answer: {
      explanation: "Iterate for max price. Search for agency where flightFacility=true, regNo matches, packageType matches ignoreCase.",
      code: `import java.util.*;
public class MyClass {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        TravelAgencies[] ta = new TravelAgencies[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine(); boolean e = sc.nextBoolean(); sc.nextLine();
            ta[i] = new TravelAgencies(a, b, c, d, e);
        }
        System.out.println(findAgencyWithHighestPackagePrice(ta));
        int regNo = sc.nextInt(); sc.nextLine(); String packageType = sc.nextLine();
        TravelAgencies res = agencyDetailsForGivenIdAndType(ta, regNo, packageType);
        if (res != null) System.out.println(res.getAgencyName()+":"+res.getPrice());
    }
    public static int findAgencyWithHighestPackagePrice(TravelAgencies[] ta) {
        int max = 0;
        for (TravelAgencies t : ta) if (t.getPrice() > max) max = t.getPrice();
        return max;
    }
    public static TravelAgencies agencyDetailsForGivenIdAndType(TravelAgencies[] ta, int reg, String pt) {
        for (TravelAgencies t : ta)
            if (t.getFlightFacility() && t.getRegno() == reg && t.getPackageType().equalsIgnoreCase(pt)) return t;
        return null;
    }
}
class TravelAgencies {
    int regno, price; String agencyName, packageType; boolean flightFacility;
    public TravelAgencies(int regno, String agencyName, String packageType, int price, boolean flightFacility) {
        this.regno=regno; this.agencyName=agencyName; this.packageType=packageType; this.price=price; this.flightFacility=flightFacility;
    }
    public int getRegno() { return regno; } public String getAgencyName() { return agencyName; }
    public String getPackageType() { return packageType; } public int getPrice() { return price; }
    public boolean getFlightFacility() { return flightFacility; }
}`
    },
    sourceFile: "IPA32/MyClass.java"
  },

  {
    id: 32,
    title: "IPA34 — Player: Find Players by Country & Runs (Alphabetical)",
    question: `Create class Player: id(int), name(String), country(String), matchesPlayed(int), runsScored(int)

Implement:
findPlayerName — return Player[] where country matches (case-insensitive) AND runsScored > given run. Return null if none.

Print players sorted alphabetically by name in format id:name or "No player found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "5\n1\nArnab\nIndia\n4\n94\n2\nVirat\nUK\n5\n68\n3\nArijit\nIndia\n82\n87\n4\nRaj\nIndia\n21\n78\n5\nPriyanka\nIndia\n12\n86\nIndia\n80",
    output: "3:Arijit\n1:Arnab\n5:Priyanka",
    examples: [{ input: "India, runs>80", output: "3:Arijit\n1:Arnab\n5:Priyanka" }],
    answer: {
      explanation: "Filter by country and runs > r. Sort by name alphabetically using compareTo. Print id:name.",
      code: `import java.util.*;
public class PlayerDetails {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Player3[] pl = new Player3[n];
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine(); int e = sc.nextInt(); sc.nextLine();
            pl[i] = new Player3(a, b, c, d, e);
        }
        String con = sc.nextLine(); int r = sc.nextInt();
        Player3[] ans = findPlayerName(pl, con, r);
        if (ans != null) {
            for (int i = 0; i < ans.length-1; i++)
                for (int j = i+1; j < ans.length; j++)
                    if (ans[i].getName().compareTo(ans[j].getName()) > 0) { Player3 t = ans[i]; ans[i] = ans[j]; ans[j] = t; }
            for (Player3 p : ans) System.out.println(p.getId()+":"+p.getName());
        } else System.out.println("No player found");
    }
    public static Player3[] findPlayerName(Player3[] p, String c, int r) {
        Player3[] arr = new Player3[0];
        for (Player3 pl : p) if (pl.getCountry().equalsIgnoreCase(c) && pl.getRun() > r) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = pl; }
        return arr.length > 0 ? arr : null;
    }
}
class Player3 {
    private int id, match, run; private String name, country;
    public Player3(int id, String name, String country, int match, int run) { this.id=id; this.name=name; this.country=country; this.match=match; this.run=run; }
    public int getId() { return id; } public String getName() { return name; }
    public String getCountry() { return country; } public int getRun() { return run; }
}`
    },
    sourceFile: "IPA34/PlayerDetails.java"
  },

  {
    id: 33,
    title: "IPA35 — Car: Remove Car by ID & Rearrange",
    question: `Create class Car: carId(int), carName(String), fuelType(String)

Implement:
RemoveAndRearrange — takes Car[] and int carId. Remove car with matching id, return remaining cars. Return null if no matching car found.

Print original_id : name for each remaining car or "There are no car with given id".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "1001\nMaruti\nDiesel\n1002\nKia\nPertro\n1003\nHyundai\nDiesel\n1004\nTaxi\nPetrol\n1005\nTruck\nDiesel\n1003",
    output: "1001 : Maruti\n1002 : Kia\n1003 : Hyundai\n1004 : Taxi",
    examples: [{ input: "5 cars, remove id 1003", output: "1001 : Maruti\n1002 : Kia\n1003 : Hyundai\n1004 : Taxi" }],
    answer: {
      explanation: "Filter out car with matching id. Return remaining cars. Print with original sequential ids.",
      code: `import java.util.*;
public class RemoveCar {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Car[] car = new Car[5];
        for (int i = 0; i < 5; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            car[i] = new Car(a, b, c);
        }
        int id = sc.nextInt();
        Car[] ans = RemoveAndRearrange(car, id);
        if (ans != null) for (int i = 0; i < ans.length; i++) System.out.println(car[i].getId()+" : "+ans[i].getName());
        else System.out.println("There are no car with given id");
    }
    public static Car[] RemoveAndRearrange(Car[] c, int id) {
        Car[] arr = new Car[0];
        for (Car car : c) if (car.getId() != id) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = car; }
        return arr.length > 0 ? arr : null;
    }
}
class Car {
    private int id; private String name, type;
    public Car(int id, String name, String type) { this.id=id; this.name=name; this.type=type; }
    public int getId() { return id; } public String getName() { return name; }
}`
    },
    sourceFile: "IPA35/RemoveCar.java"
  },

  {
    id: 34,
    title: "IPA36 — Mobile: Total Price by Brand & Second Min Price",
    question: `Create class MobileDetails: mobileId(int), price(int), brand(String), isFlagShip(boolean)

Implement:
1. getTotalPrice — return total price for given brand. Return 0 if none.
2. getSecondMin — return MobileDetails[] with 2nd minimum price mobiles.

Print total or "There are no mobile with given brand". Print brand:price for each.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "101\n25000\nSamsung\nTrue\n102\n19000\nRedmi\nFalse\n103\n28000\nNokia\nTrue\n104\n25000\nRealme\nFalse\n105\n40000\nSamsung\nTrue\nSamsung",
    output: "65000\nSamsung : 25000\nRealme : 25000",
    examples: [{ input: "5 mobiles, brand=Samsung", output: "65000\nSamsung : 25000\nRealme : 25000" }],
    answer: {
      explanation: "Sum prices for brand. Sort all by price, find 2nd unique minimum value, return all mobiles at that price.",
      code: `import java.util.*;
public class Mobile {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        MobileDetails[] mb = new MobileDetails[5];
        for (int i = 0; i < 5; i++) {
            int a = sc.nextInt(); sc.nextLine(); int b = sc.nextInt(); sc.nextLine(); String c = sc.nextLine(); boolean d = sc.nextBoolean(); sc.nextLine();
            mb[i] = new MobileDetails(a, b, c, d);
        }
        String br = sc.nextLine();
        int ans1 = getTotalPrice(mb, br);
        System.out.println(ans1 != 0 ? ans1 : "There are no mobile with given brand");
        MobileDetails[] ans2 = getSecondMin(mb);
        if (ans2 != null) for (MobileDetails m : ans2) System.out.println(m.getBrand()+" : "+m.getPrice());
        else System.out.println("Prices are same");
    }
    public static int getTotalPrice(MobileDetails[] m, String b) {
        int sum = 0;
        for (MobileDetails md : m) if (md.getBrand().equalsIgnoreCase(b)) sum += md.getPrice();
        return sum;
    }
    public static MobileDetails[] getSecondMin(MobileDetails[] m) {
        MobileDetails[] sorted = m.clone();
        for (int i = 0; i < sorted.length-1; i++)
            for (int j = i+1; j < sorted.length; j++)
                if (sorted[i].getPrice() > sorted[j].getPrice()) { MobileDetails t = sorted[i]; sorted[i] = sorted[j]; sorted[j] = t; }
        int secondMin = -1;
        for (MobileDetails md : sorted) if (md.getPrice() > sorted[0].getPrice()) { secondMin = md.getPrice(); break; }
        if (secondMin == -1) return null;
        MobileDetails[] arr = new MobileDetails[0];
        for (MobileDetails md : m) if (md.getPrice() == secondMin) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = md; }
        return arr;
    }
}
class MobileDetails {
    private int id, price; private String brand; private boolean isFlagShip;
    public MobileDetails(int id, int price, String brand, boolean isFlagShip) { this.id=id; this.price=price; this.brand=brand; this.isFlagShip=isFlagShip; }
    public int getId() { return id; } public int getPrice() { return price; } public String getBrand() { return brand; }
}`
    },
    sourceFile: "IPA36/Mobile.java"
  },

  {
    id: 35,
    title: "IPA45 — Employee: Yearly Salary & Tax Calculation",
    question: `Create class Employee: name(String), age(int), salary(double)

Implement:
1. calculateYearlySalary — return salary * 12.
2. calculateTax — tax rules:
   - yearly <= 50000: 10% of yearly
   - 50001-100000: 10% of first 50000 + 20% of amount over 50000
   - > 100000: 10%×50000 + 20%×50000 + 30% of amount over 100000

Print "Yearly salary of {name}: {amount}" and "Tax to be paid by {name}: {tax}".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Math"],
    input: "John\n30\n55000.0",
    output: "Yearly salary of John: 660000.0\nTax to be paid by John: 183000.0",
    examples: [{ input: "John\n30\n55000.0", output: "Yearly salary of John: 660000.0\nTax to be paid by John: 183000.0" }],
    answer: {
      explanation: "yearly = salary*12. Tax: slab-based calculation on yearly salary.",
      code: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String n = sc.nextLine(); int a = sc.nextInt(); double s = sc.nextDouble();
        Employee e = new Employee(n, a, s);
        System.out.println("Yearly salary of "+e.getName()+": "+calculateYearlySalary(e));
        System.out.println("Tax to be paid by "+e.getName()+": "+calculateTax(e));
    }
    public static double calculateYearlySalary(Employee emp) { return emp.getSalary() * 12; }
    public static double calculateTax(Employee emp) {
        double y = calculateYearlySalary(emp), tax = 0;
        if (y <= 50000) tax = y * 0.10;
        else if (y <= 100000) tax = 5000 + (y - 50000) * 0.20;
        else tax = 5000 + 10000 + (y - 100000) * 0.30;
        return tax;
    }
}
class Employee {
    private String name; private int age; private double salary;
    public Employee(String name, int age, double salary) { this.name=name; this.age=age; this.salary=salary; }
    public String getName() { return name; } public double getSalary() { return salary; }
}`
    },
    sourceFile: "IPA45/Solution.java"
  },

  {
    id: 36,
    title: "IPA46 — Player: Search by Side (Batting/Bowling)",
    question: `Create class Player: id(int), country(String), side(String), price(double)

Implement:
searchPlayerForMatch — return int[] of player IDs where side matches (case-insensitive), sorted ascending. Return null if none.

Print each id or "NA".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "1\nIndia\nBatting\n2500000\n2\nAustralia\nBatting\n1000000\n3\nSrilanka\nBowling\n1700000\n4\nEngland\nBowling\n2000000\nBatting",
    output: "1\n2",
    examples: [{ input: "4 players, side=Batting", output: "1\n2" }],
    answer: {
      explanation: "Filter players where side matches ignoreCase. Collect IDs, sort ascending, print each.",
      code: `import java.util.*;
public class Answer {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Player[] p = new Player[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); double d = sc.nextDouble(); sc.nextLine();
            p[i] = new Player(a, b, c, d);
        }
        String s = sc.nextLine();
        int[] ans = searchPlayerForMatch(p, s);
        if (ans != null) for (int id : ans) System.out.println(id);
        else System.out.println("NA");
    }
    public static int[] searchPlayerForMatch(Player[] p, String s) {
        int[] id = new int[0];
        for (Player pl : p) if (pl.getSide().equalsIgnoreCase(s)) { id = Arrays.copyOf(id, id.length+1); id[id.length-1] = pl.getId(); Arrays.sort(id); }
        return id.length > 0 ? id : null;
    }
}
class Player {
    int id; String country, side; double price;
    public Player(int id, String country, String side, double price) { this.id=id; this.country=country; this.side=side; this.price=price; }
    public int getId() { return id; } public String getSide() { return side; }
}`
    },
    sourceFile: "IPA46/Answer.java"
  },

  {
    id: 37,
    title: "IPA49 — Bill: Max Bill by Status & Count by Connection Type",
    question: `Create class Bill: billNo(int), name(String), typeOfConnection(String), billAmount(double), status(boolean)

Implement:
1. findBillWithMaxBillAmountBasedOnStatus — return Bill[] with max billAmount matching given status, sorted ascending by billNo. Return null if none.
2. getCountWithTypeOfConnection — return count of bills matching given connection type. Return 0 if none.

Print billNo#name for each or "There are no bill with the given status". Print count or "There are no bills with given type of connection".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "4\n111\nAman\nPrepaid\n914.25\ntrue\n222\nRekha\nPrepaid\n1425.75\nfalse\n333\nSamyra\nPrepaid\n1305.00\ntrue\n444\nMohit\nPostpaid\n1300.50\nfalse\nfalse\nPrepaid",
    output: "222#Rekha Kumar\n3",
    examples: [{ input: "status=false, type=Prepaid", output: "222#Rekha Kumar\n3" }],
    answer: {
      explanation: "Find max bill amount, filter by status+max amount, sort by billNo. Count bills matching typeOfConnection.",
      code: `import java.util.*;
public class Answer {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        Bill[] bill = new Bill[n];
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            double d = sc.nextDouble(); sc.nextLine(); boolean e = sc.nextBoolean(); sc.nextLine();
            bill[i] = new Bill(a, b, c, d, e);
        }
        boolean s = sc.nextBoolean(); sc.nextLine(); String t = sc.nextLine();
        Bill[] ans1 = findBillWithMaxBillAmountBasedOnStatus(bill, s);
        if (ans1 != null) for (Bill b : ans1) System.out.println(b.getBillNo()+"#"+b.getName());
        else System.out.println("There are no bill with the given status");
        int ans2 = getCountWithTypeOfConnection(bill, t);
        System.out.println(ans2 != 0 ? ans2 : "There are no bills with given type of connection");
    }
    public static Bill[] findBillWithMaxBillAmountBasedOnStatus(Bill[] b, boolean s) {
        double max = 0;
        for (Bill bl : b) if (bl.getBillAmount() > max) max = bl.getBillAmount();
        Bill[] arr = new Bill[0];
        for (Bill bl : b) if (bl.getStatus() == s && bl.getBillAmount() == max) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = bl; }
        for (int i = 0; i < arr.length-1; i++)
            for (int j = i; j < arr.length; j++)
                if (arr[i].getBillNo() > arr[j].getBillNo()) { Bill k = arr[i]; arr[i] = arr[j]; arr[j] = k; }
        return arr.length > 0 ? arr : null;
    }
    public static int getCountWithTypeOfConnection(Bill[] b, String t) {
        int c = 0;
        for (Bill bl : b) if (bl.getTypeOfConnection().equalsIgnoreCase(t)) c++;
        return c;
    }
}
class Bill {
    int billNo; String name, typeOfConnection; double billAmount; boolean status;
    public Bill(int billNo, String name, String typeOfConnection, double billAmount, boolean status) {
        this.billNo=billNo; this.name=name; this.typeOfConnection=typeOfConnection; this.billAmount=billAmount; this.status=status;
    }
    public int getBillNo() { return billNo; } public String getName() { return name; }
    public String getTypeOfConnection() { return typeOfConnection; } public double getBillAmount() { return billAmount; }
    public boolean getStatus() { return status; }
}`
    },
    sourceFile: "IPA49/Answer.java"
  },

  {
    id: 38,
    title: "IPA50 — BankAccount: Transfer Funds with Transaction",
    question: `Create class BankAccount: accountNumber(String), accountHolderName(String), balance(double)
Create class Transaction: transactionCode(String), amount(double), timestamp(String)
Create class BankUtils with method transferFunds.

transferFunds — deduct amount from fromAccount, add to toAccount. If insufficient balance, throw InsufficientBalanceException.

Print before/after balances and transaction details.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Exception Handling",
    difficulty: "Hard",
    tags: ["OOP", "Exception Handling"],
    input: "12345\nJohn\n5000.0\n67890\nJane\n10000.0\n2000.0\nT0001",
    output: "Before Transfer:\nAccount 1: John - 12345 - 5000.0\nAfter Transfer:\nAccount 1: John - 12345 - 3000.0\nTransaction Code: T0001",
    examples: [],
    answer: {
      explanation: "Check if fromAccount.balance >= amount. If yes, deduct and add. Record transaction with timestamp. Handle InsufficientBalanceException.",
      code: `import java.text.SimpleDateFormat;
import java.sql.Timestamp;
import java.util.*;
public class Answer {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BankAccount[] ac = new BankAccount[2];
        for (int i = 0; i < 2; i++) {
            String a = sc.nextLine(); String b = sc.nextLine(); double c = sc.nextDouble(); sc.nextLine();
            ac[i] = new BankAccount(a, b, c);
        }
        double amount = sc.nextDouble(); sc.nextLine(); String tran = sc.nextLine();
        System.out.println("Before Transfer:");
        for (int i = 0; i < ac.length; i++) System.out.println("Account "+(i+1)+": "+ac[i].getAcname()+" - "+ac[i].getAcno()+" - "+ac[i].getBalance());
        if (ac[0].getBalance() >= amount) {
            double b1 = ac[0].getBalance()-amount, b2 = ac[1].getBalance()+amount;
            String ts = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Timestamp(System.currentTimeMillis()));
            System.out.println("\\nAfter Transfer:");
            System.out.println("Account 1: "+ac[0].getAcname()+" - "+ac[0].getAcno()+" - "+b1);
            System.out.println("Account 2: "+ac[1].getAcname()+" - "+ac[1].getAcno()+" - "+b2);
            System.out.println("\\nTransaction Details:\\nTransaction Code: "+tran+"\\nAmount Transferred: "+amount+"\\nTimestamp: "+ts);
        } else {
            System.out.println("Insufficient Balance in Account 1");
        }
    }
}
class BankAccount {
    private String acno, acname; private double balance;
    public BankAccount(String acno, String acname, double balance) { this.acno=acno; this.acname=acname; this.balance=balance; }
    public String getAcno() { return acno; } public String getAcname() { return acname; } public double getBalance() { return balance; }
}`
    },
    sourceFile: "IPA50/Answer.java"
  },

  {
    id: 39,
    title: "IPA51 — Beach: Least Rating by Name & Cost",
    question: `Create class Beach: beachId(int), beachName(String), beachRating(int), beachCost(int)

Implement:
findLeastRatingWithName — return minimum rating from beaches where name matches (case-insensitive) AND cost > given int. Return 0 if none.

Print rating or "No beach found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "1001\nPuri\n3\n8600\n1002\nDigha\n5\n6200\n1003\nDigha\n3\n4000\n1004\nDigha\n4\n5500\ndigha\n5000",
    output: "4",
    examples: [{ input: "name=digha, cost>5000", output: "4" }],
    answer: {
      explanation: "Filter beaches by name (ignoreCase) and cost > f. Collect ratings, sort, return minimum (index 0).",
      code: `import java.util.*;
public class Answer {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Beach[] bc = new Beach[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); int d = sc.nextInt(); sc.nextLine();
            bc[i] = new Beach(a, b, c, d);
        }
        String e = sc.nextLine(); int f = sc.nextInt();
        int ans = findLeastRatingWithName(bc, e, f);
        System.out.println(ans != 0 ? ans : "No beach found");
    }
    public static int findLeastRatingWithName(Beach[] bc, String e, int f) {
        int[] rate = new int[0];
        for (Beach b : bc) if (b.getName().equalsIgnoreCase(e) && b.getCost() > f) { rate = Arrays.copyOf(rate, rate.length+1); rate[rate.length-1] = b.getRating(); Arrays.sort(rate); }
        return rate.length > 0 ? rate[0] : 0;
    }
}
class Beach {
    private int id, rating, cost; private String name;
    public Beach(int id, String name, int rating, int cost) { this.id=id; this.name=name; this.rating=rating; this.cost=cost; }
    public String getName() { return name; } public int getRating() { return rating; } public int getCost() { return cost; }
}`
    },
    sourceFile: "IPA51/Answer.java"
  },

  {
    id: 40,
    title: "IPA52 — Employee: Find Dept by Salary & Second Highest Salary",
    question: `Create class Employee: empId(int), empName(String), dept(String), rating(int), salary(int)

Implement:
1. findDept — return String[] of depts where salary matches AND rating >= 3. Return null if none.
2. findSecondHighestSalary — return 2nd highest salary from employees in given dept. Return 0 if none.

Print depts as comma-separated or "No Department found". Print salary or "No data found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "101\nArijit\nComputer\n4\n35000\n102\nRakesh\nElectronics\n2\n18000\n103\nMahima\nMechanical\n3\n35000\n104\nSaniya\nMechanical\n5\n68000\n105\nRajesh\nComputer\n1\n30000\n35000\nMechanical",
    output: "Computer, Mechanical\n35000",
    examples: [{ input: "salary=35000, dept=Mechanical", output: "Computer, Mechanical\n35000" }],
    answer: {
      explanation: "Filter emps where salary matches and rating >= 3 for depts. Sort salaries in dept, return 2nd lowest.",
      code: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Employee[] emp = new Employee[5];
        for (int i = 0; i < 5; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); int d = sc.nextInt(); sc.nextLine(); int e = sc.nextInt(); sc.nextLine();
            emp[i] = new Employee(a, b, c, d, e);
        }
        int sal = sc.nextInt(); sc.nextLine(); String dept = sc.nextLine();
        String[] ans1 = findDept(emp, sal);
        if (ans1 != null) { String dep = Arrays.toString(ans1); System.out.println(dep.substring(1, dep.length()-1)); }
        else System.out.println("No Department found");
        int ans2 = findSecondHighestSalary(emp, dept);
        System.out.println(ans2 != 0 ? ans2 : "No data found");
    }
    public static String[] findDept(Employee[] e, int s) {
        String[] d = new String[0];
        for (Employee em : e) if (em.getSalary() == s && em.getRating() >= 3) { d = Arrays.copyOf(d, d.length+1); d[d.length-1] = em.getDept(); }
        return d.length > 0 ? d : null;
    }
    public static int findSecondHighestSalary(Employee[] e, String d) {
        int[] sal = new int[0];
        for (Employee em : e) if (em.getDept().equalsIgnoreCase(d)) { sal = Arrays.copyOf(sal, sal.length+1); sal[sal.length-1] = em.getSalary(); Arrays.sort(sal); }
        if (sal.length > 1) return sal[sal.length-2];
        return 0;
    }
}
class Employee {
    int id, rating, salary; String name, dept;
    public Employee(int id, String name, String dept, int rating, int salary) { this.id=id; this.name=name; this.dept=dept; this.rating=rating; this.salary=salary; }
    public String getDept() { return dept; } public int getRating() { return rating; } public int getSalary() { return salary; }
}`
    },
    sourceFile: "IPA52/Solution.java"
  },

  {
    id: 41,
    title: "IPA54 — Course: Count Courses with Certificate by Mode & Rating",
    question: `Create class Course: courseId(int), courseName(String), courseRating(double), mode(String), haveCertificate(boolean)

Implement:
CountCourse — return count of courses where haveCertificate=true AND rating >= given double AND mode matches (case-insensitive). Print 0 → "No course found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "1001\nJava\n5\nOnline\nTrue\n1002\nPython\n3\nOffline\nFalse\n1003\nHTML\n4\nOffline\nTrue\n1004\nJavaScript\n2\nOnline\nFalse\n3\nOnline",
    output: "1",
    examples: [
      { input: "rating>=3, mode=Online", output: "1" },
      { input: "rating>=5, mode=Offline", output: "No course found" }
    ],
    answer: {
      explanation: "Count courses where certificate=true AND rating >= g AND mode matches ignoreCase.",
      code: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Course[] c = new Course[4];
        for (int i = 0; i < 4; i++) {
            int a = Integer.parseInt(sc.nextLine()); String b = sc.nextLine(); double d = sc.nextDouble(); sc.nextLine(); String e = sc.nextLine(); boolean f = sc.nextBoolean(); sc.nextLine();
            c[i] = new Course(a, b, d, e, f);
        }
        double g = sc.nextDouble(); sc.nextLine(); String f = sc.nextLine();
        int ans = CountCourse(c, f, g);
        System.out.println(ans > 0 ? ans : "No course found");
    }
    public static int CountCourse(Course[] c, String f, double g) {
        int count = 0;
        for (Course co : c) if (co.isCertificate() && co.getRating() >= g && co.getMode().equalsIgnoreCase(f)) count++;
        return count;
    }
}
class Course {
    private int id; private String name, mode; private double rating; private boolean certificate;
    public Course(int id, String name, double rating, String mode, boolean certificate) { this.id=id; this.name=name; this.rating=rating; this.mode=mode; this.certificate=certificate; }
    public double getRating() { return rating; } public String getMode() { return mode; } public boolean isCertificate() { return certificate; }
}`
    },
    sourceFile: "IPA54/Solution.java"
  },

  {
    id: 42,
    title: "IPA33 — Newspaper: Subscriber Count & Max Subscriptions by Category",
    question: `Create class Newspaper: newspaperId(int), name(String), category(String), subscriptions(int), isAvailable(boolean)

Implement:
1. getSubscriberCount — count newspapers where isAvailable=true AND subscriptions >= given count. Return 0 if none.
2. getMaxSubscriptionByCategory — return Newspaper with max subscriptions for given category. Return null if none.

Print count or "No Newspaper found". Print id+name or "No Newspaper found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "101\nHindu\nNational\n5000\ntrue\n102\nTOI\nNational\n8000\ntrue\n103\nDT\nLocal\n3000\nfalse\n104\nDH\nLocal\n6000\ntrue\n5000\nNational",
    output: "2\n102\nTOI",
    examples: [],
    answer: {
      explanation: "Count available newspapers with subscriptions >= threshold. Find max subscriptions newspaper for given category.",
      code: `import java.util.*;
public class NewspaperIPA {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Newspaper[] np = new Newspaper[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine();
            int d = sc.nextInt(); sc.nextLine(); boolean e = sc.nextBoolean(); sc.nextLine();
            np[i] = new Newspaper(a, b, c, d, e);
        }
        int count = sc.nextInt(); sc.nextLine(); String cat = sc.nextLine();
        int ans1 = getSubscriberCount(np, count);
        System.out.println(ans1 != 0 ? ans1 : "No Newspaper found");
        Newspaper ans2 = getMaxSubscriptionByCategory(np, cat);
        if (ans2 != null) { System.out.println(ans2.getId()); System.out.println(ans2.getName()); }
        else System.out.println("No Newspaper found");
    }
    public static int getSubscriberCount(Newspaper[] np, int c) {
        int count = 0;
        for (Newspaper n : np) if (n.isAvailable() && n.getSubs() >= c) count++;
        return count;
    }
    public static Newspaper getMaxSubscriptionByCategory(Newspaper[] np, String cat) {
        Newspaper max = null;
        for (Newspaper n : np) if (n.getCategory().equalsIgnoreCase(cat))
            if (max == null || n.getSubs() > max.getSubs()) max = n;
        return max;
    }
}
class Newspaper {
    private int id, subs; private String name, category; private boolean available;
    public Newspaper(int id, String name, String category, int subs, boolean available) {
        this.id=id; this.name=name; this.category=category; this.subs=subs; this.available=available;
    }
    public int getId() { return id; } public String getName() { return name; }
    public String getCategory() { return category; } public int getSubs() { return subs; } public boolean isAvailable() { return available; }
}`
    },
    sourceFile: "IPA33/NewspaperIPA.java"
  },

  {
    id: 29,
    title: "IPA37 — Song: Total Duration & Songs Ascending by Duration",
    question: `Create class Song: songId(int), title(String), artist(String), duration(double)

Implement:
1. findSongDurationForArtist — sum of duration for given artist. Return 0 if none.
2. getSongsInAscendingOrder — return Song[] sorted ascending by duration for given artist. Return null if none.

Print sum or "There are no songs with given artist". Print songId+title for each or "There are no songs with given artist".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "2150\nIn time\nJustin Timberlake\n4\n250\nCry Me\nJustin Timberlake\n3\n1200\nMirrors\nJustin Timberlake\n5\n1300\nThat's the way\ncelion dion\n5\n500\nAshes\ncelion dion\n3\ncelion dion\nJustin Timberlake",
    output: "8.0\n250\nCry Me\n2150\nIn time\n1200\nMirrors",
    examples: [],
    answer: {
      explanation: "Sum durations for artist1. Filter by artist2, sort ascending by duration, print id+title.",
      code: `import java.util.*;
public class IPA37 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Song[] s = new Song[5];
        for (int i = 0; i < 5; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); String c = sc.nextLine(); double d = sc.nextDouble(); sc.nextLine();
            s[i] = new Song(a, b, c, d);
        }
        String ar = sc.nextLine(), arr = sc.nextLine();
        double ans1 = findSongDurationForArtist(s, ar);
        System.out.println(ans1 != 0 ? ans1 : "There are no songs with given artist");
        Song[] ans2 = getSongsInAscendingOrder(s, arr);
        if (ans2 != null) for (Song sg : ans2) { System.out.println(sg.getId()); System.out.println(sg.getTitle()); }
        else System.out.println("There are no songs with given artist");
    }
    public static double findSongDurationForArtist(Song[] s, String a) {
        double sum = 0;
        for (Song sg : s) if (sg.getArtist().equalsIgnoreCase(a)) sum += sg.getDuration();
        return sum;
    }
    public static Song[] getSongsInAscendingOrder(Song[] s, String a) {
        Song[] arr = new Song[0];
        for (Song sg : s) if (sg.getArtist().equalsIgnoreCase(a)) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = sg; }
        for (int i = 0; i < arr.length-1; i++)
            for (int j = i; j < arr.length; j++)
                if (arr[i].getDuration() > arr[j].getDuration()) { Song t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
        return arr.length > 0 ? arr : null;
    }
}
class Song {
    int id; String title, artist; double duration;
    public Song(int id, String title, String artist, double duration) { this.id=id; this.title=title; this.artist=artist; this.duration=duration; }
    public int getId() { return id; } public String getTitle() { return title; }
    public String getArtist() { return artist; } public double getDuration() { return duration; }
}`
    },
    sourceFile: "IPA37/IPA37.java"
  },

  {
    id: 30,
    title: "IPA38 — HeadSets: Total Price by Brand & 2nd Min Price Available",
    question: `Create class HeadSets: headsetName(String), brand(String), price(int), available(boolean)

Implement:
1. findTotalPriceForGivenBrand — return total price for given brand. Return 0 if none.
2. findAvailableHeadsetWithSecondMinPrice — return available HeadSet with 2nd lowest price.

Print total or "No Headsets available with the given brand". Print name+price or "No Headsets available".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "boAt BassHeads\nboAt\n1220\ntrue\nOver Ear Wired\nboAt\n549\ntrue\nIn Ear with Mic\nJBL\n450\ntrue\nBuds 2 Neo\nRealMe\n500\ntrue\nboAt",
    output: "1769\nBuds 2 Neo\n500",
    examples: [],
    answer: {
      explanation: "Sum prices for brand. Sort all by price, check if 2nd element (index 1) is available.",
      code: `import java.util.*;
public class IPA38 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HeadSets[] hs = new HeadSets[4];
        for (int i = 0; i < 4; i++) {
            String a = sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine(); boolean d = sc.nextBoolean(); sc.nextLine();
            hs[i] = new HeadSets(a, b, c, d);
        }
        String br = sc.nextLine();
        int ans1 = findTotalPriceForGivenBrand(hs, br);
        System.out.println(ans1 != 0 ? ans1 : "No Headsets available with the given brand");
        HeadSets ans2 = findAvailableHeadsetWithSecondMinPrice(hs);
        if (ans2 != null) { System.out.println(ans2.getHname()); System.out.println(ans2.getPrice()); }
        else System.out.println("No Headsets available");
    }
    public static int findTotalPriceForGivenBrand(HeadSets[] h, String b) {
        int sum = 0;
        for (HeadSets hs : h) if (hs.getBrand().equalsIgnoreCase(b)) sum += hs.getPrice();
        return sum;
    }
    public static HeadSets findAvailableHeadsetWithSecondMinPrice(HeadSets[] h) {
        for (int i = 0; i < h.length-1; i++)
            for (int j = i+1; j < h.length; j++)
                if (h[i].getPrice() > h[j].getPrice()) { HeadSets t = h[i]; h[i] = h[j]; h[j] = t; }
        return h[1].getAvailable() ? h[1] : null;
    }
}
class HeadSets {
    private String hname, brand; private int price; private boolean available;
    public HeadSets(String hname, String brand, int price, boolean available) { this.hname=hname; this.brand=brand; this.price=price; this.available=available; }
    public String getHname() { return hname; } public String getBrand() { return brand; }
    public int getPrice() { return price; } public boolean getAvailable() { return available; }
}`
    },
    sourceFile: "IPA38/IPA38.java"
  },

  {
    id: 31,
    title: "IPA39 — Vegetable: Min Price by Rating",
    question: `Create class Vegetable: vegetableId(int), vegetableName(String), price(int), rating(int)

Implement:
findMinimumPriceByRating — return Vegetable with minimum price where rating > given rating. Return null if none.

Print vegetableId or "No such Vegetables".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "1001\nCarrot\n90\n5\n1002\nTomato\n40\n4\n1003\nBectroot\n80\n4\n1004\nOnion\n78\n3\n2",
    output: "1002",
    examples: [],
    answer: {
      explanation: "Filter vegetables with rating > r. Among those, find minimum price and return its ID.",
      code: `import java.util.*;
public class IPA39 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Veg[] v = new Veg[4];
        for (int i = 0; i < 4; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine(); int d = sc.nextInt(); sc.nextLine();
            v[i] = new Veg(a, b, c, d);
        }
        int r = sc.nextInt();
        Veg ans = findMinimumPriceByRating(v, r);
        System.out.println(ans != null ? ans.getId() : "No such Vegetables");
    }
    public static Veg findMinimumPriceByRating(Veg[] v, int r) {
        int[] arr = new int[0];
        for (Veg veg : v)
            if (veg.getRating() > r) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = veg.getPrice(); Arrays.sort(arr); }
        if (arr.length == 0) return null;
        for (Veg veg : v) if (veg.getPrice() == arr[0]) return veg;
        return null;
    }
}
class Veg {
    private int id, price, rating; private String name;
    public Veg(int id, String name, int price, int rating) { this.id=id; this.name=name; this.price=price; this.rating=rating; }
    public int getId() { return id; } public int getPrice() { return price; } public int getRating() { return rating; }
}`
    },
    sourceFile: "IPA39/IPA39.java"
  },

  {
    id: 32,
    title: "IPA40 — Car: Most Expensive & Search by Make+Model",
    question: `Create class Car: make(String), model(String), year(int), price(double)

Implement:
1. findMostExpensiveCar — return Car with highest price.
2. getCarByMakeAndModel — return Car matching make+model (case-insensitive).

Print make, model, price, year for most expensive. Print year, price for search. Print "Sorry - No car is available" if null.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "Mercedes\nS-Class\n2020\n1250000\nBMW\n5-Series\n2019\n900000\nAudi\nA4\n2022\n800000\nJaguar\nF-PACE\n2021\n1100000\nAudi\nA4",
    output: "Mercedes\nS-Class\n1250000.0\n2020\n2022\n800000.0",
    examples: [],
    answer: {
      explanation: "Sort by price, return last element for most expensive. Search by make+model with equalsIgnoreCase.",
      code: `import java.util.*;
public class IPA40 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Car[] car = new Car[4];
        for (int i = 0; i < 4; i++) {
            String a = sc.nextLine(); String b = sc.nextLine(); int c = sc.nextInt(); sc.nextLine(); double d = sc.nextDouble(); sc.nextLine();
            car[i] = new Car(a, b, c, d);
        }
        String make = sc.nextLine(), model = sc.nextLine();
        Car ans1 = findMostExpensiveCar(car);
        if (ans1 != null) { System.out.println(ans1.getMake()); System.out.println(ans1.getModel()); System.out.println(ans1.getPrice()); System.out.println(ans1.getYear()); }
        else System.out.println("Sorry - No car is available");
        Car ans2 = getCarByMakeAndModel(car, make, model);
        if (ans2 != null) { System.out.println(ans2.getYear()); System.out.println(ans2.getPrice()); }
        else System.out.println("Sorry - No car is available");
    }
    public static Car findMostExpensiveCar(Car[] c) {
        for (int i = 0; i < c.length; i++)
            for (int j = i; j < c.length; j++)
                if (c[i].getPrice() > c[j].getPrice()) { Car t = c[i]; c[i] = c[j]; c[j] = t; }
        return c.length > 0 ? c[c.length-1] : null;
    }
    public static Car getCarByMakeAndModel(Car[] c, String m, String n) {
        for (Car car : c) if (car.getMake().equalsIgnoreCase(m) && car.getModel().equalsIgnoreCase(n)) return car;
        return null;
    }
}
class Car {
    private String make, model; private int year; private double price;
    public Car(String make, String model, int year, double price) { this.make=make; this.model=model; this.year=year; this.price=price; }
    public String getMake() { return make; } public String getModel() { return model; }
    public int getYear() { return year; } public double getPrice() { return price; }
}`
    },
    sourceFile: "IPA40/IPA40.java"
  },

  {
    id: 33,
    title: "IPA41 — BankAccount: Withdraw & Deposit",
    question: `Create class BankAccount: accountNumber(int), accountHolderName(String), balance(double)

Implement:
1. withdraw — check account exists, deduct if sufficient. Return updated balance, -1 if insufficient, -2 if not found.
2. deposit — check account exists, add amount. Return updated balance, -1 if not found.

Print balance or "Sorry - Insufficient balance" / "Sorry - Account not found".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "1001\nAlice\n5000.0\n1002\nBob\n10000.0\n1003\nCharlie\n15000.0\n1002\n5000.0\n1001\n10000.0",
    output: "5000.0\n15000.0",
    examples: [],
    answer: {
      explanation: "Search by account number for both methods. For withdraw, check balance >= amount. For deposit, just add.",
      code: `import java.util.*;
public class IPA41 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BankAccount[] bnk = new BankAccount[3];
        for (int i = 0; i < 3; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine(); double c = sc.nextDouble();
            bnk[i] = new BankAccount(a, b, c);
        }
        int wa = sc.nextInt(); sc.nextLine();
        double wd = sc.nextDouble(); sc.nextLine();
        int da = sc.nextInt(); sc.nextLine();
        double dp = sc.nextDouble(); sc.nextLine();
        double ans1 = Withdraw(bnk, wa, wd);
        double ans2 = Deposit(bnk, da, dp);
        if (ans1 == -2) System.out.println("Sorry - Account not found");
        else if (ans1 == -1) System.out.println("Sorry - Insufficient balance");
        else System.out.println(ans1);
        if (ans2 == -1) System.out.println("Sorry - Account not found");
        else System.out.println(ans2);
    }
    public static double Withdraw(BankAccount[] b, int w, double wd) {
        for (BankAccount ba : b) if (ba.getAcNo() == w) return ba.getBalance() >= wd ? ba.getBalance() - wd : -1;
        return -2;
    }
    public static double Deposit(BankAccount[] b, int d, double dp) {
        for (BankAccount ba : b) if (ba.getAcNo() == d) return ba.getBalance() + dp;
        return -1;
    }
}
class BankAccount {
    private int acno; private String acname; private double balance;
    public BankAccount(int acno, String acname, double balance) { this.acno=acno; this.acname=acname; this.balance=balance; }
    public int getAcNo() { return acno; } public double getBalance() { return balance; }
}`
    },
    sourceFile: "IPA41/IPA41.java"
  },

  {
    id: 34,
    title: "IPA42 — Person/Student/Faculty: Highest GPA & Highest Salary (Inheritance)",
    question: `Create class Person: firstName, lastName, age, gender.
Extend: Student (rollNo, course, semester, GPA) and Faculty (employeeId, department, designation, salary).

Implement:
1. findHighestGPAStudent — return Student with highest GPA. Return null if empty.
2. findHighestPaidFaculty — return Faculty with highest salary. Return null if empty.

Print rollNo, course, GPA. Print employeeId, department, salary. Print "Sorry - No student/faculty is available" if null.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Inheritance",
    difficulty: "Hard",
    tags: ["OOP", "Inheritance", "Polymorphism"],
    input: "First1\nLast1\n20\nM\nRoll1\nCourse1\n2\n3.8\nFirst2\nLast2\n21\nF\nRoll2\nCourse2\n3\n3.9\nFaculty1\nLast3\n35\nM\nID1\nDepartment1\nAssociate Professor\n90000.0\nFaculty2\nLast4\n40\nF\nID2\nDepartment2\nProfessor\n100000.0",
    output: "Roll2\nCourse2\n3.9\nID2\nDepartment2\n100000.0",
    examples: [],
    answer: {
      explanation: "Iterate Student[] for max GPA. Iterate Faculty[] for max salary. Both return null if array empty.",
      code: `import java.util.*;
public class IPA42 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Student[] st = new Student[2];
        Faculty[] fa = new Faculty[2];
        for (int i = 0; i < 2; i++) {
            String a=sc.nextLine(), b=sc.nextLine(); int c=sc.nextInt(); sc.nextLine(); char d=sc.nextLine().charAt(0);
            String e=sc.nextLine(), f=sc.nextLine(); int g=sc.nextInt(); sc.nextLine(); double h=sc.nextDouble(); sc.nextLine();
            st[i] = new Student(a,b,c,d,e,f,g,h);
        }
        for (int j = 0; j < 2; j++) {
            String a=sc.nextLine(), b=sc.nextLine(); int c=sc.nextInt(); sc.nextLine(); char d=sc.nextLine().charAt(0);
            String e=sc.nextLine(), f=sc.nextLine(), g=sc.nextLine(); double h=sc.nextDouble(); sc.nextLine();
            fa[j] = new Faculty(a,b,c,d,e,f,g,h);
        }
        Student ans1 = findHighestGPAStudent(st);
        if (ans1 != null) { System.out.println(ans1.getRoll()); System.out.println(ans1.getCourse()); System.out.println(ans1.getGpa()); }
        else System.out.println("Sorry - No student is available");
        Faculty ans2 = findHighestPaidFaculty(fa);
        if (ans2 != null) { System.out.println(ans2.getId()); System.out.println(ans2.getDept()); System.out.println(ans2.getSal()); }
        else System.out.println("Sorry - No faculty is available");
    }
    public static Student findHighestGPAStudent(Student[] s) {
        Student h = s[0];
        for (Student st : s) if (st.getGpa() > h.getGpa()) h = st;
        return h;
    }
    public static Faculty findHighestPaidFaculty(Faculty[] f) {
        Faculty h = f[0];
        for (Faculty fa : f) if (fa.getSal() > h.getSal()) h = fa;
        return h;
    }
}
class Person {
    String fn, ln; int age; char gen;
    public Person(String fn, String ln, int age, char gen) { this.fn=fn; this.ln=ln; this.age=age; this.gen=gen; }
}
class Student extends Person {
    String roll, course; int sem; double gpa;
    public Student(String fn, String ln, int age, char gen, String roll, String course, int sem, double gpa) {
        super(fn,ln,age,gen); this.roll=roll; this.course=course; this.sem=sem; this.gpa=gpa;
    }
    public String getRoll() { return roll; } public String getCourse() { return course; } public double getGpa() { return gpa; }
}
class Faculty extends Person {
    String id, dept, des; double sal;
    public Faculty(String fn, String ln, int age, char gen, String id, String dept, String des, double sal) {
        super(fn,ln,age,gen); this.id=id; this.dept=dept; this.des=des; this.sal=sal;
    }
    public String getId() { return id; } public String getDept() { return dept; } public double getSal() { return sal; }
}`
    },
    sourceFile: "IPA42/IPA42.java"
  },

  {
    id: 35,
    title: "IPA43 — Student: Average GPA & Filter by Course",
    question: `Create class Student: name, rollNo, age, gender, course, semester, GPA

Implement:
1. calculateAverageGPA — return avg GPA of all students. Return 0 if empty.
2. getStudentsByCourse — return Student[] matching course (case-insensitive). Return null if none.

Print avg (1 decimal) or "Sorry - No students are available". Print name, rollNo, GPA for each or "Sorry - No students are available for the given course".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "John\n1234\n20\nM\nCSE\n2\n3.5\nAlice\n5678\n19\nF\nEEE\n1\n3.7\nBob\n9101\n21\nM\nCSE\n4\n3.9\nSarah\n2345\n20\nF\nME\n3\n3.2\nCSE",
    output: "3.6\nJohn\n1234\n3.5\nBob\n9101\n3.9",
    examples: [],
    answer: {
      explanation: "Sum all GPAs and divide by count. Filter students by course, print name+rollNo+GPA.",
      code: `import java.util.*;
public class IPA43 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Student[] s = new Student[4];
        for (int i = 0; i < 4; i++) {
            String a=sc.nextLine(), b=sc.nextLine(); int c=sc.nextInt(); sc.nextLine(); char d=sc.nextLine().charAt(0);
            String e=sc.nextLine(); int f=sc.nextInt(); sc.nextLine(); double g=sc.nextDouble(); sc.nextLine();
            s[i] = new Student(a,b,c,d,e,f,g);
        }
        String course = sc.nextLine();
        double ans1 = calculateAverageGPA(s);
        if (ans1 != 0) { System.out.printf("%.1f%n", ans1); }
        else System.out.println("Sorry - No students are available");
        Student[] ans2 = getStudentsByCourse(s, course);
        if (ans2 != null) for (Student st : ans2) { System.out.println(st.getN()); System.out.println(st.getR()); System.out.println(st.getGpa()); }
        else System.out.println("Sorry - No students are available for the given course");
    }
    public static double calculateAverageGPA(Student[] s) {
        double sum = 0; int c = 0;
        for (Student st : s) { sum += st.getGpa(); c++; }
        return c > 0 ? sum/c : 0;
    }
    public static Student[] getStudentsByCourse(Student[] s, String c) {
        Student[] arr = new Student[0];
        for (Student st : s) if (st.getC().equalsIgnoreCase(c)) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = st; }
        return arr.length > 0 ? arr : null;
    }
}
class Student {
    String n, r, c; int a, sem; char g; double gpa;
    public Student(String n, String r, int a, char g, String c, int sem, double gpa) {
        this.n=n; this.r=r; this.a=a; this.g=g; this.c=c; this.sem=sem; this.gpa=gpa;
    }
    public String getN() { return n; } public String getR() { return r; }
    public String getC() { return c; } public double getGpa() { return gpa; }
}`
    },
    sourceFile: "IPA43/IPA43.java"
  },

  {
    id: 36,
    title: "IPA44 — Rectangle: Area & Perimeter",
    question: `Create class Rectangle: length(double), breadth(double)

Implement:
1. calculateArea — return area (length * breadth) for each rectangle.
2. calculatePerimeter — return perimeter 2*(length+breadth) for each.

Print area and perimeter for each rectangle on separate lines.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Math"],
    input: "5.5\n3.2\n7.0\n4.5",
    output: "17.6\n17.4\n31.5\n23.0",
    examples: [],
    answer: {
      explanation: "Calculate area = l*b, perimeter = 2*(l+b) for each Rectangle object.",
      code: `import java.util.*;
public class IPA44 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Rectangle[] r = new Rectangle[2];
        for (int i = 0; i < 2; i++) {
            double a = sc.nextDouble(); sc.nextLine(); double b = sc.nextDouble(); sc.nextLine();
            r[i] = new Rectangle(a, b);
        }
        double[] area = calculateArea(r);
        double[] per = calculatePerimeter(r);
        for (int i = 0; i < 2; i++) { System.out.println(area[i]); System.out.println(per[i]); }
    }
    public static double[] calculateArea(Rectangle[] r) {
        double[] arr = new double[r.length];
        for (int i = 0; i < r.length; i++) arr[i] = r[i].getL() * r[i].getB();
        return arr;
    }
    public static double[] calculatePerimeter(Rectangle[] r) {
        double[] ar = new double[r.length];
        for (int i = 0; i < r.length; i++) ar[i] = 2 * (r[i].getL() + r[i].getB());
        return ar;
    }
}
class Rectangle {
    private double l, b;
    public Rectangle(double l, double b) { this.l=l; this.b=b; }
    public double getL() { return l; } public double getB() { return b; }
}`
    },
    sourceFile: "IPA44/IPA44.java"
  },

  {
    id: 37,
    title: "IPA48 — Validate Scores List",
    question: `Define two functions:
1. validateScore(n) — return true if 0 < n <= 100 AND n is integer. False otherwise.
2. findValidScores(arr) — return int[] of valid scores from input array using validateScore.

Read n elements, call findValidScores, print "Valid scores are = [...]" or "No valid score found."`,
    marks: 35,
    category: "IPA",
    subcategory: "Arrays / Logic",
    difficulty: "Easy",
    tags: ["Arrays", "Validation"],
    input: "5\n10\n20\n101\n90\n0",
    output: "Valid scores are = [10, 20, 90]",
    examples: [
      { input: "5\n10\n20\n101\n90\n0", output: "Valid scores are = [10, 20, 90]" },
      { input: "8\n-100\n101\n0\n.80\n101\n120\n-75\n0.78", output: "No valid score found." }
    ],
    answer: {
      explanation: "Validate each score: must be > 0, <= 100, and an integer value. Collect valid ones and print.",
      code: `import java.util.*;
public class IPA48 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        double[] arr = new double[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextDouble();
        String ans = findValidScores(arr);
        System.out.println(ans != null ? "Valid scores are = " + ans : "No valid score found.");
    }
    public static boolean ValidateScore(double n) { return n > 0 && n <= 100 && (int)n == n; }
    public static String findValidScores(double[] a) {
        int[] ar = new int[0];
        for (double d : a) if (ValidateScore(d)) { ar = Arrays.copyOf(ar, ar.length+1); ar[ar.length-1] = (int)d; }
        return ar.length > 0 ? Arrays.toString(ar) : null;
    }
}`
    },
    sourceFile: "IPA48/IPA48.java"
  },

  {
    id: 38,
    title: "IPA53 — Course: Find Status by Course Name",
    question: `Create class Course: courseName(String), courseNumber(int), mode(String), shareData(boolean)

Implement:
findCourseStatus — return status for matching courseName: courseNumber >= 1000 → "High", >= 500 → "Medium", < 500 → "Low". Return "No course found" if no match.`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Easy",
    tags: ["OOP", "Arrays"],
    input: "Java\n1200\nOnline\nFalse\nPython\n600\nOffline\nFalse\nHTML\n800\nOffline\nFalse\nJavaScript\n300\nOnline\nTrue\nPython",
    output: "Medium",
    examples: [
      { input: "...Python", output: "Medium" },
      { input: "...PHP", output: "No course found" }
    ],
    answer: {
      explanation: "Search course by name (case-insensitive). Check courseNumber: >=1000 High, >=500 Medium, <500 Low.",
      code: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Course[] c = new Course[4];
        for (int i = 0; i < 4; i++) {
            String a = sc.nextLine(); int b = Integer.parseInt(sc.nextLine());
            String d = sc.nextLine(); boolean e = Boolean.parseBoolean(sc.nextLine());
            c[i] = new Course(a, b, d, e);
        }
        String name = sc.nextLine();
        System.out.println(findCourseStatus(c, name));
    }
    public static String findCourseStatus(Course[] c, String name) {
        for (Course co : c)
            if (co.getName().equalsIgnoreCase(name))
                return co.getNum() >= 1000 ? "High" : co.getNum() >= 500 ? "Medium" : "Low";
        return "No course found";
    }
}
class Course {
    private String name, mode; private int num; private boolean share;
    public Course(String name, int num, String mode, boolean share) { this.name=name; this.num=num; this.mode=mode; this.share=share; }
    public String getName() { return name; } public int getNum() { return num; }
}`
    },
    sourceFile: "IPA53/Solution.java"
  },

  {
    id: 39,
    title: "IPA55 — Resort: Avg Price by Category (rating > 4)",
    question: `Create class Resort: id(int), name(String), category(String), price(double), rate(double)

Implement:
findAvgPrice — return avg price (int) of resorts where category matches AND rate > 4. Return 0 if none.

Print "The average price of {cat}:{avg}" or "No resorts are available".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "1\nSunrise\nLuxury\n5000\n4.5\n2\nLake View\nBudget\n2000\n3.5\n3\nOcean Breeze\nLuxury\n8000\n4.8\n4\nHillTop\nBudget\n1500\n4.2\nLuxury",
    output: "The average price of Luxury:6500",
    examples: [],
    answer: {
      explanation: "Filter resorts by category and rate > 4. Sum prices, divide by count for average.",
      code: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Resort[] rs = new Resort[4];
        for (int i = 0; i < 4; i++) {
            int a = Integer.parseInt(sc.nextLine()); String b = sc.nextLine(); String c = sc.nextLine();
            double d = sc.nextDouble(); sc.nextLine(); double e = sc.nextDouble(); sc.nextLine();
            rs[i] = new Resort(a, b, c, d, e);
        }
        String cat = sc.nextLine();
        double ans = findAvgPrice(rs, cat);
        if (ans != 0) System.out.println("The average price of "+cat+":"+(int)ans);
        else System.out.println("No resorts are available");
    }
    public static double findAvgPrice(Resort[] r, String s) {
        double sum = 0; int n = 0;
        for (Resort rs : r) if (rs.getCat().equalsIgnoreCase(s) && rs.getRate() > 4) { sum += rs.getPrice(); n++; }
        return n > 0 ? sum/n : 0;
    }
}
class Resort {
    private int id; private String name, cat; private double price, rate;
    public Resort(int id, String name, String cat, double price, double rate) {
        this.id=id; this.name=name; this.cat=cat; this.price=price; this.rate=rate;
    }
    public String getCat() { return cat; } public double getPrice() { return price; } public double getRate() { return rate; }
}`
    },
    sourceFile: "IPA55/Solution.java"
  },

  {
    id: 40,
    title: "IPA2 — Footwear: Count by Type & Second Highest Price by Brand",
    question: `Create class Footwear: footwearId(int), footwearName(String), footwearType(String), price(int)

Implement two static methods:
1. getCountByType — return count of footwears matching given footwearType (case-insensitive). Return 0 if none.
2. getSecondHighestPriceByBrand — return Footwear object with second highest price matching given footwearName (case-insensitive). Return null if brand not found.

Print count or "Footwear not available". Print footwearId, footwearName, price or "Brand not available".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "100\nSketchers\nsneekers\n12345\n103\nPuma\nrunning shoes\n10099\n102\nreebok\nRunning shoes\n5667\n101\nReebok\nrunning shoes\n5656\n99\nreebok\nfloaters\n5666\nRunning shoes\nreebok",
    output: "3\n99\nreebok\n5666",
    examples: [
      { input: "...Running shoes\nreebok", output: "3\n99\nreebok\n5666" },
      { input: "...running shoes\nbata", output: "Footwear not available\nBrand not available" }
    ],
    answer: {
      explanation: "Count footwears where type matches (case-insensitive). For second highest price by brand: filter by brand, sort by price descending, return second element.",
      code: `import java.util.*;
public class footwearProgram {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Footwear[] ft = new Footwear[5];
        for (int i = 0; i < 5; i++) {
            int a = sc.nextInt(); sc.nextLine();
            String b = sc.nextLine(); String c = sc.nextLine();
            int d = sc.nextInt(); sc.nextLine();
            ft[i] = new Footwear(a, b, c, d);
        }
        String ftType = sc.nextLine(), ftName = sc.nextLine();
        int count = getCountByType(ft, ftType);
        if (count > 0) System.out.println(count);
        else System.out.println("Footwear not available");
        Footwear obj = getSecondHighestPriceByBrand(ft, ftName);
        if (obj != null) { System.out.println(obj.getId()); System.out.println(obj.getName()); System.out.println(obj.getPrice()); }
        else System.out.println("Brand not available");
    }
    public static int getCountByType(Footwear[] ft, String t) {
        int count = 0;
        for (Footwear f : ft) if (f.getType().equalsIgnoreCase(t)) count++;
        return count;
    }
    public static Footwear getSecondHighestPriceByBrand(Footwear[] ft, String name) {
        Footwear[] filtered = new Footwear[0];
        for (Footwear f : ft)
            if (f.getName().equalsIgnoreCase(name)) { filtered = Arrays.copyOf(filtered, filtered.length+1); filtered[filtered.length-1] = f; }
        if (filtered.length < 2) return filtered.length == 0 ? null : null;
        for (int i = 0; i < filtered.length; i++)
            for (int j = i+1; j < filtered.length; j++)
                if (filtered[i].getPrice() < filtered[j].getPrice()) { Footwear t = filtered[i]; filtered[i] = filtered[j]; filtered[j] = t; }
        return filtered[1];
    }
}
class Footwear {
    private int id, price; private String name, type;
    public Footwear(int id, String name, String type, int price) {
        this.id=id; this.name=name; this.type=type; this.price=price;
    }
    public int getId() { return id; } public String getName() { return name; }
    public String getType() { return type; } public int getPrice() { return price; }
}`
    },
    sourceFile: "IPA2/footwearProgram.java"
  },

  {
    id: 41,
    title: "IPA — Employee: Second Lowest Salary & Count by Age",
    question: `Create class Employee: employeeId(int), employeeName(String), age(int), gender(char), salary(double)

Implement:
1. getEmployeeWithSecondLowestSalary — return Employee[] with second lowest salary. Return null if < 2 employees.
2. countEmployeesBasedOnAge — return count of employees matching given age. Return 0 if none.

Print employeeId#employeeName for each result or "Null". Print count or "No employee found for the given age".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays", "Sorting"],
    input: "4\n101\nJohn\n30\nM\n10000.00\n102\nSamantha\n25\nF\n15000.00\n103\nAlex\n28\nM\n12000.00\n104\nLisa\n30\nF\n15000.00\n30",
    output: "103#Alex\n2",
    examples: [
      { input: "4\n101\nJohn\n30\nM\n10000.00\n...\n30", output: "103#Alex\n2" }
    ],
    answer: {
      explanation: "Sort by salary ascending, skip duplicates at lowest, collect all at second-lowest salary. Count by matching age.",
      code: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        Employee[] emp = new Employee[n];
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt(); sc.nextLine(); String b = sc.nextLine();
            int c = sc.nextInt(); sc.nextLine(); char d = sc.next().charAt(0); sc.nextLine();
            double e = sc.nextDouble(); sc.nextLine();
            emp[i] = new Employee(a, b, c, d, e);
        }
        int age = sc.nextInt();
        Employee[] ans1 = getEmployeeWithSecondLowestSalary(emp);
        if (ans1 != null) for (Employee em : ans1) System.out.println(em.getId()+"#"+em.getName());
        else System.out.println("Null");
        int ans2 = countEmployeesBasedOnAge(emp, age);
        System.out.println(ans2 != 0 ? ans2 : "No employee found for the given age");
    }
    public static Employee[] getEmployeeWithSecondLowestSalary(Employee[] e) {
        if (e.length < 2) return null;
        for (int i = 0; i < e.length; i++)
            for (int j = i; j < e.length; j++)
                if (e[i].getSalary() > e[j].getSalary()) { Employee t = e[i]; e[i] = e[j]; e[j] = t; }
        Employee[] det = new Employee[0];
        for (int i = 0; i < e.length; i++)
            if (e[i].getSalary() > e[0].getSalary()) { det = Arrays.copyOf(det, det.length+1); det[det.length-1] = e[i]; break; }
        for (int i = 0; i < e.length; i++)
            if (det.length > 0 && det[0].getSalary() == e[i].getSalary() && e[i].getId() != det[0].getId()) {
                det = Arrays.copyOf(det, det.length+1); det[det.length-1] = e[i];
            }
        return det;
    }
    public static int countEmployeesBasedOnAge(Employee[] e, int a) {
        int count = 0;
        for (Employee em : e) if (em.getAge() == a) count++;
        return count;
    }
}
class Employee {
    private int id, age; private String name; private char gender; private double salary;
    public Employee(int id, String name, int age, char gender, double salary) {
        this.id=id; this.name=name; this.age=age; this.gender=gender; this.salary=salary;
    }
    public int getId() { return id; } public String getName() { return name; }
    public int getAge() { return age; } public double getSalary() { return salary; }
}`
    },
    sourceFile: "2nd_Lowest_Salary/Solution.java"
  },

  {
    id: 42,
    title: "IPA — Company & Employee: Avg Salary, Max Salary & Filter by Designation",
    question: `Create class Employee: id(int), name(String), designation(String), salary(double)
Create class Company: companyName(String), employees(Employee[]), numEmployees(int)

Implement methods in Company:
1. getAverageSalary() — return average salary of all employees.
2. getMaxSalary() — return highest salary.
3. getEmployeesByDesignation(String) — return Employee[] with matching designation (case-insensitive).

Print Average salary, Max salary, then each matched employee as "ID: x, Name: y, Designation: z, Salary: w".`,
    marks: 35,
    category: "IPA",
    subcategory: "OOP / Collections",
    difficulty: "Medium",
    tags: ["OOP", "Arrays"],
    input: "ABC Company\n3\n101\nJohn Smith\nManager\n5000\n102\nJane Doe\nEngineer\n4000\n103\nBob Johnson\nEngineer\n4500\nEngineer",
    output: "Average salary: 4500.0\nMax salary: 5000.0\nEmployees with designation: Engineer\nID: 102, Name: Jane Doe, Designation: Engineer, Salary: 4000.0\nID: 103, Name: Bob Johnson, Designation: Engineer, Salary: 4500.0",
    examples: [],
    answer: {
      explanation: "Sum all salaries and divide for average. Iterate to find max. Filter by designation using equalsIgnoreCase.",
      code: `import java.util.*;
public class Answer {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String cn = sc.nextLine();
        int num = Integer.parseInt(sc.nextLine());
        Employee[] emp = new Employee[num];
        for (int i = 0; i < num; i++) {
            int a = Integer.parseInt(sc.nextLine()); String b = sc.nextLine();
            String c = sc.nextLine(); double d = Double.parseDouble(sc.nextLine());
            emp[i] = new Employee(a, b, c, d);
        }
        Company com = new Company(cn, emp, num);
        System.out.println("Average salary: " + com.getAverageSalary(emp));
        System.out.println("Max salary: " + com.getMaxSalary(emp));
        String desi = sc.nextLine();
        System.out.println("Employees with designation: " + desi);
        Employee[] ans = com.getEmployeesByDesignation(emp, desi);
        if (ans != null)
            for (Employee e : ans)
                System.out.println("ID: "+e.getId()+", Name: "+e.getName()+", Designation: "+e.getDes()+", Salary: "+e.getSalary());
    }
}
class Employee {
    private int id; private String name, des; private double salary;
    public Employee(int id, String name, String des, double salary) {
        this.id=id; this.name=name; this.des=des; this.salary=salary;
    }
    public int getId() { return id; } public String getName() { return name; }
    public String getDes() { return des; } public double getSalary() { return salary; }
}
class Company {
    private String comName; private Employee[] emp; private int numEmp;
    public Company(String comName, Employee[] emp, int numEmp) {
        this.comName=comName; this.emp=emp; this.numEmp=numEmp;
    }
    public double getAverageSalary(Employee[] e) {
        double sum = 0;
        for (Employee em : e) sum += em.getSalary();
        return sum > 0 ? sum/e.length : 0;
    }
    public double getMaxSalary(Employee[] e) {
        double max = e[0].getSalary();
        for (Employee em : e) if (em.getSalary() > max) max = em.getSalary();
        return max;
    }
    public Employee[] getEmployeesByDesignation(Employee[] e, String d) {
        Employee[] res = new Employee[0];
        for (Employee em : e)
            if (em.getDes().equalsIgnoreCase(d)) { res = Arrays.copyOf(res, res.length+1); res[res.length-1] = em; }
        return res.length > 0 ? res : null;
    }
}`
    },
    sourceFile: "Company_Employee/Answer.java"
  },

  // ── 15-MARK QUESTIONS (standalone files — question and code in same file) ──────────────────────

  {
    id: 40,
    title: "Armstrong Number",
    question: "Check if a given number is an Armstrong number.\nA number is Armstrong if the sum of cubes of its digits equals the number itself.\nExample: 153 = 1³ + 5³ + 3³ = 153",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Math"],
    input: "153",
    output: "Yes, the number is an Armstrong number.",
    examples: [
      { input: "153", output: "Yes, the number is an Armstrong number." },
      { input: "123", output: "No, the number is not an Armstrong number." }
    ],
    answer: {
      explanation: "For each digit, compute digit³ and sum all. Compare with original number.",
      code: `import java.util.*;
/* Armstrong Number Check
 * A number is Armstrong if sum of cubes of digits == number
 * e.g. 153 = 1^3 + 5^3 + 3^3 = 153
 */
public class Armstrong {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String num = sc.nextLine();
        int sum = 0;
        for (int i = 0; i < num.length(); i++)
            sum += Math.pow(Integer.parseInt(String.valueOf(num.charAt(i))), 3);
        if (sum == Integer.parseInt(num))
            System.out.println("Yes, the number is an Armstrong number.");
        else
            System.out.println("No, the number is not an Armstrong number.");
    }
}`
    },
    sourceFile: "Armstrong.java"
  },

  {
    id: 41,
    title: "Average of Numbers",
    question: "Read n numbers and print their average.\n\nExample: 5 numbers: 10 20 30 40 50 → Average: 30.0",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Math"],
    input: "5\n10 20 30 40 50",
    output: "30.0",
    examples: [{ input: "5\n10 20 30 40 50", output: "30.0" }],
    answer: {
      explanation: "Read n numbers, sum them, divide by n.",
      code: `import java.util.*;
/* Average of n numbers */
public class avg {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        double sum = 0;
        for (int i = 0; i < n; i++) sum += sc.nextInt();
        System.out.println(sum / n);
    }
}`
    },
    sourceFile: "avg.java"
  },

  {
    id: 42,
    title: "Check Even Number",
    question: "Check if a given number is even or odd.\n\nExample: 4 → Even, 7 → Odd",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers"],
    input: "4",
    output: "Even",
    examples: [{ input: "4", output: "Even" }, { input: "7", output: "Odd" }],
    answer: {
      explanation: "Use modulo 2. If n%2==0 it's even, else odd.",
      code: `import java.util.*;
/* Even or Odd check */
public class evencheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n % 2 == 0 ? "Even" : "Odd");
    }
}`
    },
    sourceFile: "evencheck.java"
  },

  {
    id: 43,
    title: "Fibonacci Series",
    question: "Print the Fibonacci series up to n terms.\nFibonacci: 0, 1, 1, 2, 3, 5, 8...\nEach number = sum of two preceding.",
    marks: 15,
    category: "PRA",
    subcategory: "Loops",
    difficulty: "Easy",
    tags: ["Loops", "Fibonacci"],
    input: "7",
    output: "0 1 1 2 3 5 8",
    examples: [{ input: "7", output: "0 1 1 2 3 5 8" }],
    answer: {
      explanation: "Maintain two variables a=0, b=1. Print a, shift a=b, b=a+b each iteration.",
      code: `import java.util.*;
/* Fibonacci series up to n terms */
public class Fibonacci {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            System.out.print(a + " ");
            int temp = a + b; a = b; b = temp;
        }
    }
}`
    },
    sourceFile: "Fibonacci.java"
  },

  {
    id: 44,
    title: "Count Vowels in String",
    question: "Count the number of vowels (a, e, i, o, u) in a given string.\n\nExample: 'Hello World' → 3",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "Vowels"],
    input: "Hello World",
    output: "3",
    examples: [{ input: "Hello World", output: "3" }],
    answer: {
      explanation: "Convert to lowercase, iterate each character, check if it's in 'aeiou', count.",
      code: `import java.util.*;
/* Count vowels in a string */
public class CountVowel {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().toLowerCase();
        int count = 0;
        for (char c : s.toCharArray())
            if ("aeiou".indexOf(c) >= 0) count++;
        System.out.println(count);
    }
}`
    },
    sourceFile: "CountVowel.java"
  },

  {
    id: 45,
    title: "Count Prime Digits",
    question: "Count the number of prime digits (2, 3, 5, 7) in a given number.\n\nExample: 254786135 → 5",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Prime"],
    input: "254786135",
    output: "5",
    examples: [{ input: "254786135", output: "5" }],
    answer: {
      explanation: "Iterate each digit character, check if it's prime (2,3,5,7), count those.",
      code: `import java.util.*;
/* Count prime digits in a number
 * Prime digits: 2, 3, 5, 7
 */
public class CountPrime {
    public static void main(String[] args) {
        int count = 0;
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        for (int i = 0; i < s.length(); i++) {
            int p = Integer.parseInt(String.valueOf(s.charAt(i)));
            if (isPrime(p)) count++;
        }
        System.out.println(count);
    }
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i < n; i++) if (n % i == 0) return false;
        return true;
    }
}`
    },
    sourceFile: "CountPrime.java"
  },

  {
    id: 46,
    title: "Count Uppercase Letters",
    question: "Count the number of uppercase letters in a string.\n\nExample: 'Hello World Java' → 3",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World Java",
    output: "3",
    examples: [{ input: "Hello World Java", output: "3" }],
    answer: {
      explanation: "Use Character.isUpperCase(c) for each character and count matches.",
      code: `import java.util.*;
/* Count uppercase letters in a string */
public class Count_UpperCase {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int count = 0;
        for (char c : s.toCharArray())
            if (Character.isUpperCase(c)) count++;
        System.out.println(count);
    }
}`
    },
    sourceFile: "Count_UpperCase.java"
  },

  {
    id: 47,
    title: "Count Lowercase Letters",
    question: "Count the number of lowercase letters in a string.\n\nExample: 'Hello World' → 8",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World",
    output: "8",
    examples: [{ input: "Hello World", output: "8" }],
    answer: {
      explanation: "Use Character.isLowerCase(c) for each character and count matches.",
      code: `import java.util.*;
/* Count lowercase letters in a string */
public class Count_LowerCase {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int count = 0;
        for (char c : s.toCharArray())
            if (Character.isLowerCase(c)) count++;
        System.out.println(count);
    }
}`
    },
    sourceFile: "Count_LowerCase.java"
  },

  {
    id: 48,
    title: "Count Words in String",
    question: "Count the number of words in a given sentence.\n\nExample: 'Hello World Java' → 3",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World Java",
    output: "3",
    examples: [{ input: "Hello World Java", output: "3" }],
    answer: {
      explanation: "Split the string by whitespace using split(\"\\\\s+\") and count the parts.",
      code: `import java.util.*;
/* Count words in a string */
public class Count_Word {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        System.out.println(s.split("\\s+").length);
    }
}`
    },
    sourceFile: "Count_Word.java"
  },

  {
    id: 49,
    title: "Count Words Containing Vowels",
    question: "Count words in a string that contain at least one vowel.\n\nExample: 'sky is blue' → 2 (sky has no vowel, is and blue have vowels)",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "Vowels"],
    input: "sky is blue",
    output: "2",
    examples: [{ input: "sky is blue", output: "2" }],
    answer: {
      explanation: "Split by spaces, for each word check if any character is a vowel, count those words.",
      code: `import java.util.*;
/* Count words that contain at least one vowel */
public class Count_Word_Vowel {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] words = sc.nextLine().toLowerCase().split("\\s+");
        int count = 0;
        for (String w : words)
            for (char c : w.toCharArray())
                if ("aeiou".indexOf(c) >= 0) { count++; break; }
        System.out.println(count);
    }
}`
    },
    sourceFile: "Count_Word_Vowel.java"
  },

  {
    id: 50,
    title: "Find First Non-Repeated Character",
    question: "Find the first non-repeated character in a string.\n\nExample: 'swiss' → 'w'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Medium",
    tags: ["Strings", "HashMap"],
    input: "swiss",
    output: "w",
    examples: [
      { input: "swiss", output: "w" },
      { input: "aabb", output: "No non-repeated character." }
    ],
    answer: {
      explanation: "Use LinkedHashMap to count character frequencies, return first with count=1.",
      code: `import java.util.*;
/* Find first non-repeated character
 * Use LinkedHashMap to preserve insertion order
 */
public class First_NonRepeated_Char {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        LinkedHashMap<Character, Integer> map = new LinkedHashMap<>();
        for (char c : s.toCharArray())
            map.put(c, map.getOrDefault(c, 0) + 1);
        for (Map.Entry<Character, Integer> e : map.entrySet()) {
            if (e.getValue() == 1) { System.out.println(e.getKey()); return; }
        }
        System.out.println("No non-repeated character.");
    }
}`
    },
    sourceFile: "First_NonRepeated_Char.java"
  },

  {
    id: 51,
    title: "First Letter of Each Word",
    question: "Print the first letter of each word in a sentence.\n\nExample: 'Hello World Java' → H W J",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World Java",
    output: "H W J",
    examples: [{ input: "Hello World Java", output: "H W J" }],
    answer: {
      explanation: "Split the string by spaces and print charAt(0) of each word.",
      code: `import java.util.*;
/* Print first letter of each word */
public class FirstLetterOfEachWord {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] words = sc.nextLine().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String w : words) sb.append(w.charAt(0)).append(" ");
        System.out.println(sb.toString().trim());
    }
}`
    },
    sourceFile: "FirstLetterOfEachWord.java"
  },

  {
    id: 52,
    title: "First Longest Non-Repeated Substring",
    question: "Find the first longest substring with no repeating characters.\n\nExample: 'abcabcbb' → 'abc'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Hard",
    tags: ["Strings", "Sliding Window"],
    input: "abcabcbb",
    output: "abc",
    examples: [{ input: "abcabcbb", output: "abc" }],
    answer: {
      explanation: "Use sliding window with a set. Expand right, shrink left when duplicate found. Track max length substring.",
      code: `import java.util.*;
/* First longest non-repeated substring
 * Sliding window approach
 */
public class First_Longest_Nonrepeated_Substring {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int maxLen = 0, start = 0, maxStart = 0;
        Set<Character> set = new LinkedHashSet<>();
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) set.remove(s.charAt(left++));
            set.add(s.charAt(right));
            if (right - left + 1 > maxLen) { maxLen = right - left + 1; maxStart = left; }
        }
        System.out.println(s.substring(maxStart, maxStart + maxLen));
    }
}`
    },
    sourceFile: "First_Longest_Nonrepeated_Substring.java"
  },

  {
    id: 53,
    title: "Consecutive Two Vowels Check",
    question: "Check if a string has 2 or more consecutive vowels.\n\nExample: 'beautiful' → Yes (ea, au)",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "Vowels"],
    input: "beautiful",
    output: "Yes",
    examples: [
      { input: "beautiful", output: "Yes" },
      { input: "strength", output: "No" }
    ],
    answer: {
      explanation: "Check every adjacent pair — if both are vowels, print Yes.",
      code: `import java.util.*;
/* Check if string has 2 consecutive vowels */
public class Consecutive2vowels {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().toLowerCase();
        String v = "aeiou";
        for (int i = 0; i < s.length() - 1; i++) {
            if (v.indexOf(s.charAt(i)) >= 0 && v.indexOf(s.charAt(i+1)) >= 0) {
                System.out.println("Yes"); return;
            }
        }
        System.out.println("No");
    }
}`
    },
    sourceFile: "Consecutive2vowels.java"
  },

  {
    id: 54,
    title: "Consonants at Odd Positions",
    question: "Print consonants that appear at odd positions (1-indexed) in a string.\n\nExample: 'Hello' → H, l, o are at pos 1,3,5 — H and l are consonants",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello",
    output: "H l",
    examples: [{ input: "Hello", output: "H l" }],
    answer: {
      explanation: "Iterate with 1-based index. At odd positions, check if character is a consonant (not a vowel).",
      code: `import java.util.*;
/* Print consonants at odd positions (1-indexed) */
public class Consonent_OddPosition {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if ((i + 1) % 2 != 0 && Character.isLetter(c) && "aeiouAEIOU".indexOf(c) < 0)
                System.out.print(c + " ");
        }
    }
}`
    },
    sourceFile: "Consonent_OddPosition.java"
  },

  {
    id: 55,
    title: "Character Count in String",
    question: "Count occurrences of a specific character in a string.\n\nExample: 'hello world', 'l' → 3",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "hello world\nl",
    output: "3",
    examples: [{ input: "hello world\nl", output: "3" }],
    answer: {
      explanation: "Iterate through string and count occurrences of the given character.",
      code: `import java.util.*;
/* Count occurrences of a character in a string */
public class charCount {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        char ch = sc.nextLine().charAt(0);
        int count = 0;
        for (char c : s.toCharArray()) if (c == ch) count++;
        System.out.println(count);
    }
}`
    },
    sourceFile: "charCount.java"
  },

  {
    id: 56,
    title: "Repeated Characters in String",
    question: "Find and print characters that appear more than once in a string.\n\nExample: 'programming' → r, g, m",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "HashMap"],
    input: "programming",
    output: "r g m",
    examples: [{ input: "programming", output: "r g m" }],
    answer: {
      explanation: "Use LinkedHashMap to count char frequencies. Print chars with count > 1.",
      code: `import java.util.*;
/* Find repeated characters in a string */
public class CharRepeat {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        LinkedHashMap<Character, Integer> map = new LinkedHashMap<>();
        for (char c : s.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);
        for (Map.Entry<Character, Integer> e : map.entrySet())
            if (e.getValue() > 1) System.out.print(e.getKey() + " ");
        System.out.println();
    }
}`
    },
    sourceFile: "CharRepeat.java"
  },

  {
    id: 57,
    title: "Perfect Number Check",
    question: "Check if a given number is a perfect number.\nA perfect number equals the sum of its proper divisors.\nExample: 6 = 1+2+3 = 6 → Perfect",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Math"],
    input: "6",
    output: "6 is a perfect number.",
    examples: [
      { input: "6", output: "6 is a perfect number." },
      { input: "12", output: "12 is not a perfect number." }
    ],
    answer: {
      explanation: "Sum all proper divisors (1 to n-1 that divide n evenly), compare with n.",
      code: `import java.util.*;
/* Check if a number is perfect
 * Perfect: sum of proper divisors equals the number
 */
public class PerfectNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int sum = 0;
        for (int i = 1; i < n; i++) if (n % i == 0) sum += i;
        System.out.println(sum == n ? n+" is a perfect number." : n+" is not a perfect number.");
    }
}`
    },
    sourceFile: "PerfectNumber.java"
  },

  {
    id: 58,
    title: "Perfect Square Check",
    question: "Check if a given number is a perfect square.\n\nExample: 16 → Yes (4*4), 15 → No",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Math"],
    input: "16",
    output: "Yes",
    examples: [{ input: "16", output: "Yes" }, { input: "15", output: "No" }],
    answer: {
      explanation: "Take sqrt of number, check if it's an integer: (int)sqrt == sqrt.",
      code: `import java.util.*;
/* Check if number is a perfect square */
public class PerfectSquareOrNot {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        double sqrt = Math.sqrt(n);
        System.out.println((int)sqrt == sqrt ? "Yes" : "No");
    }
}`
    },
    sourceFile: "PerfectSquareOrNot.java"
  },

  {
    id: 59,
    title: "Palindrome Check",
    question: "Check whether a given string is a palindrome.\n\nExample: 'madam' → palindrome",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "Palindrome"],
    input: "madam",
    output: "Yes, it is a palindrome.",
    examples: [
      { input: "madam", output: "Yes, it is a palindrome." },
      { input: "hello", output: "No, it is not a palindrome." }
    ],
    answer: {
      explanation: "Reverse the string using StringBuilder and compare with original.",
      code: `import java.util.*;
/* Palindrome check using StringBuilder */
public class Palindrome {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        String rev = new StringBuilder(s).reverse().toString();
        System.out.println(s.equals(rev) ? "Yes, it is a palindrome." : "No, it is not a palindrome.");
    }
}`
    },
    sourceFile: "Palindrome.java"
  },

  {
    id: 60,
    title: "Palindrome in String (Find All Palindromes)",
    question: "Find all palindromic words in a given sentence.\n\nExample: 'madam is a racecar' → madam, a, racecar",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Medium",
    tags: ["Strings", "Palindrome"],
    input: "madam is a racecar",
    output: "madam\na\nracecar",
    examples: [{ input: "madam is a racecar", output: "madam\na\nracecar" }],
    answer: {
      explanation: "Split sentence into words, check each word if it's a palindrome, print those that are.",
      code: `import java.util.*;
/* Find all palindromic words in a sentence */
public class Palindrome_in_String {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] words = sc.nextLine().split("\\s+");
        for (String w : words) {
            String rev = new StringBuilder(w).reverse().toString();
            if (w.equals(rev)) System.out.println(w);
        }
    }
}`
    },
    sourceFile: "Palindrome_in_String.java"
  },

  {
    id: 61,
    title: "Remove Vowels from String",
    question: "Remove all vowels from a given string.\n\nExample: 'Hello World' → 'Hll Wrld'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World",
    output: "Hll Wrld",
    examples: [{ input: "Hello World", output: "Hll Wrld" }],
    answer: {
      explanation: "Use replaceAll with regex [aeiouAEIOU] to remove all vowels at once.",
      code: `import java.util.*;
/* Remove all vowels from a string */
public class Remove_Vowel {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(s.replaceAll("[aeiouAEIOU]", ""));
    }
}`
    },
    sourceFile: "Remove_Vowel.java"
  },

  {
    id: 62,
    title: "Remove Duplicate Characters",
    question: "Remove duplicate characters from a string while preserving order.\n\nExample: 'programming' → 'progamin'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "Collections"],
    input: "programming",
    output: "progamin",
    examples: [{ input: "programming", output: "progamin" }],
    answer: {
      explanation: "Use LinkedHashSet which preserves insertion order and auto-removes duplicates.",
      code: `import java.util.*;
/* Remove duplicate characters preserving order
 * LinkedHashSet maintains insertion order + no duplicates
 */
public class Remove_Duplicate {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        LinkedHashSet<Character> set = new LinkedHashSet<>();
        for (char c : s.toCharArray()) set.add(c);
        StringBuilder sb = new StringBuilder();
        for (char c : set) sb.append(c);
        System.out.println(sb.toString());
    }
}`
    },
    sourceFile: "Remove_Duplicate.java"
  },

  {
    id: 63,
    title: "Remove Two Consecutive Same Letters",
    question: "Remove pairs of consecutive identical letters from a string.\n\nExample: 'aabbcc' → '' (empty), 'aabcd' → 'bcd'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Medium",
    tags: ["Strings"],
    input: "aabbcc",
    output: "",
    examples: [{ input: "aabbcc", output: "" }, { input: "aabcd", output: "bcd" }],
    answer: {
      explanation: "Use a stack-like approach: iterate chars, if stack top equals current char, pop it; else push. Print remaining.",
      code: `import java.util.*;
/* Remove consecutive duplicate pairs from a string */
public class Remove2ConsecutiveLetter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (sb.length() > 0 && sb.charAt(sb.length()-1) == c) sb.deleteCharAt(sb.length()-1);
            else sb.append(c);
        }
        System.out.println(sb.toString());
    }
}`
    },
    sourceFile: "Remove2ConsecutiveLetter.java"
  },

  {
    id: 64,
    title: "Remove a Specific Letter from String",
    question: "Remove all occurrences of a given character from a string.\n\nExample: 'hello', 'l' → 'heo'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "hello\nl",
    output: "heo",
    examples: [{ input: "hello\nl", output: "heo" }],
    answer: {
      explanation: "Use String.replace(char, empty string) or iterate and skip matching characters.",
      code: `import java.util.*;
/* Remove all occurrences of a character */
public class RemoveLetter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        char ch = sc.nextLine().charAt(0);
        System.out.println(s.replace(String.valueOf(ch), ""));
    }
}`
    },
    sourceFile: "RemoveLetter.java"
  },

  {
    id: 65,
    title: "Find Repeated Number in Array",
    question: "Find the repeated number in an array.\n\nExample: [1, 2, 3, 2, 4] → 2",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays", "HashMap"],
    input: "5\n1 2 3 2 4",
    output: "2",
    examples: [{ input: "5\n1 2 3 2 4", output: "2" }],
    answer: {
      explanation: "Use HashMap to count occurrences of each number, find the one with count > 1.",
      code: `import java.util.*;
/* Find the repeated number in an array */
public class RepeatedNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            map.put(x, map.getOrDefault(x, 0) + 1);
        }
        for (Map.Entry<Integer, Integer> e : map.entrySet())
            if (e.getValue() > 1) System.out.println(e.getKey());
    }
}`
    },
    sourceFile: "RepeatedNumber.java"
  },

  {
    id: 66,
    title: "Repeated Sum of Digits",
    question: "Repeatedly sum digits of a number until a single digit is obtained.\n\nExample: 9875 → 9+8+7+5=29 → 2+9=11 → 1+1=2",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Math"],
    input: "9875",
    output: "2",
    examples: [{ input: "9875", output: "2" }],
    answer: {
      explanation: "Loop: sum up all digits. If result > 9, repeat with that sum as input.",
      code: `import java.util.*;
/* Repeated digit sum until single digit */
public class RepeatedSum_Digit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n > 9) {
            int sum = 0;
            while (n > 0) { sum += n % 10; n /= 10; }
            n = sum;
        }
        System.out.println(n);
    }
}`
    },
    sourceFile: "RepeatedSum_Digit.java"
  },

  {
    id: 67,
    title: "Repeat String N Times",
    question: "Repeat a given string n times.\n\nExample: 'hello' 3 → 'hellohellohello'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "hello\n3",
    output: "hellohellohello",
    examples: [{ input: "hello\n3", output: "hellohellohello" }],
    answer: {
      explanation: "Use StringBuilder in a loop, append string n times.",
      code: `import java.util.*;
/* Repeat a string n times */
public class RepeatString {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int n = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) sb.append(s);
        System.out.println(sb.toString());
    }
}`
    },
    sourceFile: "RepeatString.java"
  },

  {
    id: 68,
    title: "Reverse a String",
    question: "Reverse a given string.\n\nExample: 'hello' → 'olleh'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "hello",
    output: "olleh",
    examples: [{ input: "hello", output: "olleh" }, { input: "Java", output: "avaJ" }],
    answer: {
      explanation: "Use StringBuilder.reverse() to reverse the string in one line.",
      code: `import java.util.*;
/* Reverse a string using StringBuilder */
public class ReverseString {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(new StringBuilder(s).reverse().toString());
    }
}`
    },
    sourceFile: "ReverseString.java"
  },

  {
    id: 69,
    title: "Reverse Odd-Indexed Words",
    question: "Reverse words at odd positions in a string.\n\nExample: 'Hello World Java Python' → 'Hello dlroW Java nohtyP'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Medium",
    tags: ["Strings"],
    input: "Hello World Java Python",
    output: "Hello dlroW Java nohtyP",
    examples: [{ input: "Hello World Java Python", output: "Hello dlroW Java nohtyP" }],
    answer: {
      explanation: "Split by spaces, for words at even index (0-based) print as-is, for odd index print reversed.",
      code: `import java.util.*;
/* Reverse words at odd positions (1-indexed = even 0-indexed) */
public class Odd_Reverse {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] words = sc.nextLine().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            if (i % 2 == 0) sb.append(words[i]);
            else sb.append(new StringBuilder(words[i]).reverse());
            if (i < words.length - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`
    },
    sourceFile: "Odd_Reverse.java"
  },

  {
    id: 70,
    title: "Same First and Second Letters Check",
    question: "Check if first and last letters of a string are the same.\n\nExample: 'madam' → Yes (m...m), 'hello' → No",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "madam",
    output: "Yes",
    examples: [{ input: "madam", output: "Yes" }, { input: "hello", output: "No" }],
    answer: {
      explanation: "Compare charAt(0) with charAt(length-1).",
      code: `import java.util.*;
/* Check if first and last characters are the same */
public class Same_1st_2nd_Letter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(s.charAt(0) == s.charAt(s.length()-1) ? "Yes" : "No");
    }
}`
    },
    sourceFile: "Same_1st_2nd_Letter.java"
  },

  {
    id: 71,
    title: "Find Smallest Character",
    question: "Find the lexicographically smallest character in a string.\n\nExample: 'programming' → 'a'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "programming",
    output: "a",
    examples: [{ input: "programming", output: "a" }],
    answer: {
      explanation: "Initialize min with first char, iterate to find smaller characters.",
      code: `import java.util.*;
/* Find the smallest (lexicographically minimum) character */
public class Smallest_Character {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().toLowerCase();
        char min = s.charAt(0);
        for (char c : s.toCharArray()) if (c < min) min = c;
        System.out.println(min);
    }
}`
    },
    sourceFile: "Smallest_Character.java"
  },

  {
    id: 72,
    title: "Sort Names Alphabetically",
    question: "Sort an array of names alphabetically.\n\nExample: ['Priya', 'Arijit', 'Zara'] → Arijit, Priya, Zara",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays", "Sorting"],
    input: "3\nPriya\nArijit\nZara",
    output: "Arijit\nPriya\nZara",
    examples: [{ input: "3\nPriya\nArijit\nZara", output: "Arijit\nPriya\nZara" }],
    answer: {
      explanation: "Read names into String array, use Arrays.sort() for lexicographic sort.",
      code: `import java.util.*;
/* Sort names alphabetically */
public class SortingName {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        String[] names = new String[n];
        for (int i = 0; i < n; i++) names[i] = sc.nextLine();
        Arrays.sort(names);
        for (String name : names) System.out.println(name);
    }
}`
    },
    sourceFile: "SortingName.java"
  },

  {
    id: 73,
    title: "Count Spaces in String",
    question: "Count the number of spaces in a given string.\n\nExample: 'Hello World Java' → 2",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World Java",
    output: "2",
    examples: [{ input: "Hello World Java", output: "2" }],
    answer: {
      explanation: "Iterate characters and count those equal to space ' '.",
      code: `import java.util.*;
/* Count spaces in a string */
public class Space_Count {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int count = 0;
        for (char c : s.toCharArray()) if (c == ' ') count++;
        System.out.println(count);
    }
}`
    },
    sourceFile: "Space_Count.java"
  },

  {
    id: 74,
    title: "Split String by Delimiter",
    question: "Split a string by a given delimiter and print each part.\n\nExample: 'a:b:c', ':' → a, b, c",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "a:b:c\n:",
    output: "a\nb\nc",
    examples: [{ input: "a:b:c\n:", output: "a\nb\nc" }],
    answer: {
      explanation: "Use String.split(delimiter) and print each element.",
      code: `import java.util.*;
/* Split a string by a delimiter */
public class Split {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        String delim = sc.nextLine();
        String[] parts = s.split(delim);
        for (String p : parts) System.out.println(p);
    }
}`
    },
    sourceFile: "Split.java"
  },

  {
    id: 75,
    title: "Sum of Even Integers",
    question: "Find the sum of all even integers in an array.\n\nExample: [1, 2, 3, 4, 5, 6] → 12",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays", "Math"],
    input: "6\n1 2 3 4 5 6",
    output: "12",
    examples: [{ input: "6\n1 2 3 4 5 6", output: "12" }],
    answer: {
      explanation: "Iterate array and add to sum only if element % 2 == 0.",
      code: `import java.util.*;
/* Sum of even integers in array */
public class Sum_EvenInteger {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), sum = 0;
        for (int i = 0; i < n; i++) { int x = sc.nextInt(); if (x % 2 == 0) sum += x; }
        System.out.println(sum);
    }
}`
    },
    sourceFile: "Sum_EvenInteger.java"
  },

  {
    id: 76,
    title: "Sum of Prime Digits",
    question: "Find the sum of prime digits (2, 3, 5, 7) in a given number.\n\nExample: 25493 → 2+5+3 = 10",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Prime"],
    input: "25493",
    output: "10",
    examples: [{ input: "25493", output: "10" }],
    answer: {
      explanation: "Iterate each digit, check if it's prime (2,3,5,7), sum those.",
      code: `import java.util.*;
/* Sum of prime digits in a number */
public class Sum_Prime_Digits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int sum = 0;
        int[] primes = {2, 3, 5, 7};
        for (char c : s.toCharArray()) {
            int d = c - '0';
            for (int p : primes) if (d == p) { sum += d; break; }
        }
        System.out.println(sum);
    }
}`
    },
    sourceFile: "Sum_Prime_Digits.java"
  },

  {
    id: 77,
    title: "Sum Up to N",
    question: "Find the sum of all numbers from 1 to N.\n\nExample: N=5 → 1+2+3+4+5 = 15",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Math"],
    input: "5",
    output: "15",
    examples: [{ input: "5", output: "15" }, { input: "10", output: "55" }],
    answer: {
      explanation: "Use formula n*(n+1)/2 or a simple loop.",
      code: `import java.util.*;
/* Sum of numbers from 1 to N */
public class Sum_Upto_n {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n * (n + 1) / 2);
    }
}`
    },
    sourceFile: "Sum_Upto_n.java"
  },

  {
    id: 78,
    title: "Sum of Even Digits",
    question: "Find the sum of all even digits in a number.\n\nExample: 12345 → 2+4 = 6",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers"],
    input: "12345",
    output: "6",
    examples: [{ input: "12345", output: "6" }],
    answer: {
      explanation: "Iterate each digit character, parse to int, check if even, sum.",
      code: `import java.util.*;
/* Sum of even digits in a number */
public class SumOfEvenDigit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int sum = 0;
        for (char c : s.toCharArray()) {
            int d = c - '0';
            if (d % 2 == 0) sum += d;
        }
        System.out.println(sum);
    }
}`
    },
    sourceFile: "SumOfEvenDigit.java"
  },

  {
    id: 79,
    title: "Sum of Numbers",
    question: "Find the sum of all numbers in an array.\n\nExample: [1, 2, 3, 4, 5] → 15",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays", "Math"],
    input: "5\n1 2 3 4 5",
    output: "15",
    examples: [{ input: "5\n1 2 3 4 5", output: "15" }],
    answer: {
      explanation: "Read n numbers into array, iterate and accumulate sum.",
      code: `import java.util.*;
/* Sum of all numbers in an array */
public class SumOfNum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), sum = 0;
        for (int i = 0; i < n; i++) sum += sc.nextInt();
        System.out.println(sum);
    }
}`
    },
    sourceFile: "SumOfNum.java"
  },

  {
    id: 80,
    title: "Multiplication Table",
    question: "Print the multiplication table of a given number up to 10.\n\nExample: 3 → 3x1=3, 3x2=6, ... 3x10=30",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers", "Loops"],
    input: "3",
    output: "3x1=3\n3x2=6\n...\n3x10=30",
    examples: [{ input: "3", output: "3x1=3\n3x2=6\n3x3=9\n3x4=12\n3x5=15\n3x6=18\n3x7=21\n3x8=24\n3x9=27\n3x10=30" }],
    answer: {
      explanation: "Loop from 1 to 10, print n x i = n*i each iteration.",
      code: `import java.util.*;
/* Multiplication table of a number */
public class table {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 1; i <= 10; i++)
            System.out.println(n + "x" + i + "=" + (n * i));
    }
}`
    },
    sourceFile: "table.java"
  },

  {
    id: 81,
    title: "Largest Word in String",
    question: "Find the largest (longest) word in a string.\n\nExample: 'Hello World Java' → 'Hello' (5 chars)",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World Java",
    output: "Hello",
    examples: [{ input: "Hello World Java", output: "Hello" }],
    answer: {
      explanation: "Split by spaces, track word with maximum length.",
      code: `import java.util.*;
/* Find the longest word in a string */
public class LargestWord {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] words = sc.nextLine().split("\\s+");
        String max = words[0];
        for (String w : words) if (w.length() > max.length()) max = w;
        System.out.println(max);
    }
}`
    },
    sourceFile: "LargestWord.java"
  },

  {
    id: 82,
    title: "Last Character of Each Word",
    question: "Print the last character of each word in a sentence.\n\nExample: 'Hello World' → o d",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World",
    output: "o d",
    examples: [{ input: "Hello World", output: "o d" }],
    answer: {
      explanation: "Split by spaces, print last char (charAt(length-1)) of each word.",
      code: `import java.util.*;
/* Print last character of each word */
public class LastChar {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] words = sc.nextLine().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String w : words) sb.append(w.charAt(w.length()-1)).append(" ");
        System.out.println(sb.toString().trim());
    }
}`
    },
    sourceFile: "LastChar.java"
  },

  {
    id: 83,
    title: "Majority Element in Array",
    question: "Find the element appearing more than n/2 times in an array.\n\nExample: [3,3,4,2,3,3,3] → 3",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Medium",
    tags: ["Arrays", "HashMap"],
    input: "7\n3 3 4 2 3 3 3",
    output: "3",
    examples: [{ input: "7\n3 3 4 2 3 3 3", output: "3" }],
    answer: {
      explanation: "Use HashMap to count frequencies. Return element with count > n/2.",
      code: `import java.util.*;
/* Find majority element — appears more than n/2 times */
public class Majority {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            map.put(x, map.getOrDefault(x, 0) + 1);
        }
        for (Map.Entry<Integer, Integer> e : map.entrySet())
            if (e.getValue() > n / 2) { System.out.println(e.getKey()); return; }
        System.out.println("No majority element");
    }
}`
    },
    sourceFile: "Majority.java"
  },

  {
    id: 84,
    title: "Merge Two Sorted Arrays",
    question: "Merge two sorted arrays into one sorted array.\n\nExample: [1,3,5] + [2,4,6] → [1,2,3,4,5,6]",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Medium",
    tags: ["Arrays", "Sorting"],
    input: "3\n1 3 5\n3\n2 4 6",
    output: "1 2 3 4 5 6",
    examples: [{ input: "3\n1 3 5\n3\n2 4 6", output: "1 2 3 4 5 6" }],
    answer: {
      explanation: "Two-pointer technique: compare front elements of both arrays, pick smaller.",
      code: `import java.util.*;
/* Merge two sorted arrays using two-pointer technique */
public class Marge {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n]; for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int m = sc.nextInt();
        int[] b = new int[m]; for (int i = 0; i < m; i++) b[i] = sc.nextInt();
        int[] result = new int[n + m];
        int i = 0, j = 0, k = 0;
        while (i < n && j < m) result[k++] = a[i] < b[j] ? a[i++] : b[j++];
        while (i < n) result[k++] = a[i++];
        while (j < m) result[k++] = b[j++];
        StringBuilder sb = new StringBuilder();
        for (int x : result) sb.append(x).append(" ");
        System.out.println(sb.toString().trim());
    }
}`
    },
    sourceFile: "Marge.java"
  },

  {
    id: 85,
    title: "Maximum ASCII Value Character",
    question: "Find the character with the maximum ASCII value in a string.\n\nExample: 'Hello' → o (111)",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "ASCII"],
    input: "Hello",
    output: "o",
    examples: [{ input: "Hello", output: "o" }],
    answer: {
      explanation: "Iterate chars, track max ASCII value character.",
      code: `import java.util.*;
/* Find character with maximum ASCII value */
public class MaximumAscii {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        char max = s.charAt(0);
        for (char c : s.toCharArray()) if (c > max) max = c;
        System.out.println(max);
    }
}`
    },
    sourceFile: "MaximumAscii.java"
  },

  {
    id: 86,
    title: "Missing Number in Array",
    question: "Find the missing number in an array containing 1 to n with one missing.\n\nExample: [1,2,4,5] n=5 → Missing: 3",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays", "Math"],
    input: "5\n1 2 4 5",
    output: "3",
    examples: [{ input: "5\n1 2 4 5", output: "3" }],
    answer: {
      explanation: "Expected sum = n*(n+1)/2. Missing = expected - actual sum.",
      code: `import java.util.*;
/* Find missing number using sum formula
 * Expected sum n*(n+1)/2 minus actual sum = missing number
 */
public class Missing {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int i = 0; i < n - 1; i++) actual += sc.nextInt();
        System.out.println(expected - actual);
    }
}`
    },
    sourceFile: "Missing.java"
  },

  {
    id: 87,
    title: "Occurrence of Each Character",
    question: "Count the occurrence of each character in a string.\n\nExample: 'aab' → a:2, b:1",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "HashMap"],
    input: "aab",
    output: "a:2\nb:1",
    examples: [{ input: "aab", output: "a:2\nb:1" }],
    answer: {
      explanation: "Use LinkedHashMap to count each char frequency, print key:value pairs.",
      code: `import java.util.*;
/* Count occurrence of each character */
public class Occurance {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        LinkedHashMap<Character, Integer> map = new LinkedHashMap<>();
        for (char c : s.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);
        for (Map.Entry<Character, Integer> e : map.entrySet())
            System.out.println(e.getKey() + ":" + e.getValue());
    }
}`
    },
    sourceFile: "Occurance.java"
  },

  {
    id: 88,
    title: "Unique Characters Check",
    question: "Check if all characters in a string are unique.\n\nExample: 'hello' → false (l repeats), 'world' → false, 'abcde' → true",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "Collections"],
    input: "abcde",
    output: "true",
    examples: [{ input: "abcde", output: "true" }, { input: "hello", output: "false" }],
    answer: {
      explanation: "Use HashSet — if any char already exists in set, not unique. Set size == string length means all unique.",
      code: `import java.util.*;
/* Check if all characters are unique */
public class UniqueCharacters {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        Set<Character> set = new HashSet<>();
        for (char c : s.toCharArray()) set.add(c);
        System.out.println(set.size() == s.length());
    }
}`
    },
    sourceFile: "UniqueCharacters.java"
  },

  {
    id: 89,
    title: "Find Uppercase Letters",
    question: "Print all uppercase letters found in a string.\n\nExample: 'Hello World Java' → H W J",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "Hello World Java",
    output: "H W J",
    examples: [{ input: "Hello World Java", output: "H W J" }],
    answer: {
      explanation: "Iterate chars and print those that are uppercase.",
      code: `import java.util.*;
/* Find and print all uppercase letters */
public class Find_UpperCase {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        for (char c : s.toCharArray())
            if (Character.isUpperCase(c)) System.out.print(c + " ");
        System.out.println();
    }
}`
    },
    sourceFile: "Find_UpperCase.java"
  },

  {
    id: 90,
    title: "Find Count of Each Word",
    question: "Count how many times each word appears in a sentence.\n\nExample: 'hello world hello' → hello:2, world:1",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "HashMap"],
    input: "hello world hello",
    output: "hello:2\nworld:1",
    examples: [{ input: "hello world hello", output: "hello:2\nworld:1" }],
    answer: {
      explanation: "Split by spaces, use LinkedHashMap to count word frequencies.",
      code: `import java.util.*;
/* Count occurrences of each word */
public class Find_CountWord {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] words = sc.nextLine().split("\\s+");
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        for (String w : words) map.put(w, map.getOrDefault(w, 0) + 1);
        for (Map.Entry<String, Integer> e : map.entrySet())
            System.out.println(e.getKey() + ":" + e.getValue());
    }
}`
    },
    sourceFile: "Find_CountWord.java"
  },

  {
    id: 91,
    title: "Intersection of Two Sets",
    question: "Find common elements between two sets.\n\nExample: {1,2,3,4} ∩ {3,4,5,6} = {3,4}",
    marks: 15,
    category: "PRA",
    subcategory: "Collections",
    difficulty: "Easy",
    tags: ["Collections", "Set"],
    input: "4\n1 2 3 4\n4\n3 4 5 6",
    output: "3 4",
    examples: [{ input: "4\n1 2 3 4\n4\n3 4 5 6", output: "3 4" }],
    answer: {
      explanation: "Add first set to TreeSet (sorted). Use retainAll() with second set to keep only common elements.",
      code: `import java.util.*;
/* Intersection of two sets using retainAll */
public class IntersectionOfSet {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Set<Integer> a = new TreeSet<>();
        for (int i = 0; i < n; i++) a.add(sc.nextInt());
        int m = sc.nextInt();
        Set<Integer> b = new HashSet<>();
        for (int i = 0; i < m; i++) b.add(sc.nextInt());
        a.retainAll(b);
        for (int x : a) System.out.print(x + " ");
        System.out.println();
    }
}`
    },
    sourceFile: "IntersectionOfSet.java"
  },

  {
    id: 92,
    title: "Index Number Calculate",
    question: "Given a string of letters, calculate sum of positions (a=1, b=2...z=26) of all characters.\n\nExample: 'abc' → 1+2+3 = 6",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings", "Math"],
    input: "abc",
    output: "6",
    examples: [{ input: "abc", output: "6" }, { input: "az", output: "27" }],
    answer: {
      explanation: "For each lowercase char, its position = char - 'a' + 1. Sum all positions.",
      code: `import java.util.*;
/* Calculate sum of alphabetic positions */
public class IndexNumber_Calculate {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().toLowerCase();
        int sum = 0;
        for (char c : s.toCharArray()) if (Character.isLetter(c)) sum += (c - 'a' + 1);
        System.out.println(sum);
    }
}`
    },
    sourceFile: "IndexNumber_Calculate.java"
  },

  // ── TCS DIGITAL — 15-MARK (from repo2, question in comments, code in same file) ─────────────

  {
    id: 93,
    title: "Alphanumeric Palindrome",
    question: "Check if a string is a valid palindrome considering only alphanumeric characters (ignore case, spaces, punctuation).\n\nExample: 'A man, a plan, a canal: Panama' → True",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Medium",
    tags: ["Strings", "Palindrome"],
    input: "A man, a plan, a canal: Panama",
    output: "True",
    examples: [
      { input: "A man, a plan, a canal: Panama", output: "True" },
      { input: "hello world", output: "False" }
    ],
    answer: {
      explanation: "Filter only letters to char array, then compare i from start and end.",
      code: `import java.util.*;
/* Alphanumeric palindrome — ignore non-letter chars, case insensitive */
public class Alphanumeric_Palindrome {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().toLowerCase();
        char[] ch = new char[0];
        for (int i = 0; i < s.length(); i++)
            if (Character.isLetter(s.charAt(i))) { ch = Arrays.copyOf(ch, ch.length+1); ch[ch.length-1] = s.charAt(i); }
        boolean check = true;
        for (int i = 0; i < ch.length; i++)
            if (ch[i] != ch[ch.length-1-i]) { check = false; break; }
        System.out.println(check ? "True" : "False");
    }
}`
    },
    sourceFile: "Alphanumeric_Palindrome.java"
  },

  {
    id: 94,
    title: "Anagram Check",
    question: "Check if two strings are anagrams of each other.\n\nAn anagram uses the same letters rearranged.\n\nExample: 'listen' and 'silent' → True",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "listen\nsilent",
    output: "True",
    examples: [
      { input: "listen\nsilent", output: "True" },
      { input: "hello\nworld", output: "False" }
    ],
    answer: {
      explanation: "Check each char of s1 exists in s2. If all match and lengths equal → anagram.",
      code: `import java.util.*;
/* Anagram check — two strings use same characters rearranged */
public class Anagram {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.nextLine(), s2 = sc.nextLine();
        char[] ch1 = s1.toCharArray(), ch2 = s2.toCharArray();
        int check = 0;
        for (int i = 0; i < ch1.length; i++)
            for (int j = 0; j < ch2.length; j++)
                if (ch1[i] == ch2[j]) { check++; break; }
        System.out.println(ch1.length == ch2.length && check == ch1.length ? "True" : "False");
    }
}`
    },
    sourceFile: "Anagram.java"
  },

  {
    id: 95,
    title: "Array Rotation",
    question: "Rotate an array to the right by k positions.\n\nExample: [1,2,3,4,5] rotated by 3 → [3,4,5,1,2]",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Medium",
    tags: ["Arrays"],
    input: "5\n1 2 3 4 5\n3",
    output: "3 4 5 1 2",
    examples: [{ input: "5\n1 2 3 4 5\n3", output: "3 4 5 1 2" }],
    answer: {
      explanation: "Take last element, shift all right, place at front. Repeat k times.",
      code: `import java.util.*;
/* Array rotation — shift elements right by k positions */
public class Arrays_Rotation {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int k = sc.nextInt();
        for (int i = 0; i < k; i++) {
            int num = arr[n-1];
            for (int j = n-1; j > 0; j--) arr[j] = arr[j-1];
            arr[0] = num;
        }
        for (int i = 0; i < arr.length; i++) System.out.print(arr[i] + " ");
        System.out.println();
    }
}`
    },
    sourceFile: "Arrays_Rotation.java"
  },

  {
    id: 96,
    title: "Count Non-Repeated Digit Numbers in Range",
    question: "Count numbers between a range that have no repeated digits.\n\nExample: 10 to 25 → count all numbers with unique digits",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Medium",
    tags: ["Numbers"],
    input: "10\n25",
    output: "14",
    examples: [{ input: "10\n25", output: "14" }],
    answer: {
      explanation: "For each number in range, convert to string, check if any two chars are same. Count those with no duplicates.",
      code: `import java.util.*;
/* Count numbers with no repeated digits in range */
public class BetweenNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt(), count = 0;
        for (int i = a; i <= b; i++) {
            String s = Integer.toString(i);
            int num = 0;
            for (int j = 0; j < s.length()-1; j++)
                for (int k = j+1; k < s.length(); k++)
                    if (s.charAt(j) == s.charAt(k)) num++;
            if (num == 0) count++;
        }
        System.out.println(count);
    }
}`
    },
    sourceFile: "BetweenNumber.java"
  },

  {
    id: 97,
    title: "Common Prefix of Strings",
    question: "Find the longest common prefix among an array of strings.\n\nExample: ['flower','flow','flight'] → 'fl'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Medium",
    tags: ["Strings"],
    input: "3\nflower\nflow\nflight",
    output: "fl",
    examples: [
      { input: "3\nflower\nflow\nflight", output: "fl" },
      { input: "2\ndog\nrace", output: "" }
    ],
    answer: {
      explanation: "Find min length. For each position, check if all strings have same char. Stop when mismatch found.",
      code: `import java.util.*;
/* Find longest common prefix among array of strings */
public class Common_Prefix {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        String[] arr = new String[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextLine();
        String ans = "";
        int min = arr[0].length();
        for (int i = 1; i < arr.length; i++) if (arr[i].length() < min) min = arr[i].length();
        for (int i = 0; i < min; i++) {
            boolean check = true;
            for (int j = 1; j < arr.length; j++) if (arr[j-1].charAt(i) != arr[j].charAt(i)) { check = false; break; }
            if (check) ans += arr[0].charAt(i); else break;
        }
        System.out.println(ans);
    }
}`
    },
    sourceFile: "Common_Prefix.java"
  },

  {
    id: 98,
    title: "Count Elimination Character",
    question: "Find how many characters must be removed so character counts have a common difference.\n\nExample: 'aaaaabbc' with diff=1 → remove 2",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Hard",
    tags: ["Strings", "Math"],
    input: "aaaaabbc\n1",
    output: "2",
    examples: [{ input: "aaaaabbc\n1", output: "2" }],
    answer: {
      explanation: "Count consecutive char groups. Check if each gap matches required diff. Sum excess chars to remove.",
      code: `import java.util.*;
/* Count chars to remove for common difference in counts
 * e.g. aaaaabbc → counts [5,2,1], diff=1: 5-2=3 (remove 2 to get 3-1=2), 2-1=1 ok → answer=2
 */
public class Count_Elimination_Character {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int i = 0, j = 0;
        int[] arr = new int[0];
        while (i == j) {
            int count = 0;
            while (j < s.length()) {
                if (s.charAt(i) == s.charAt(j)) count++;
                else { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = count; i = j; break; }
                j++;
            }
            if (j == s.length()) { arr = Arrays.copyOf(arr, arr.length+1); arr[arr.length-1] = count; break; }
        }
        int diff = sc.nextInt(), c = 0;
        for (int k = arr.length-1; k > 0; k--) {
            if (arr[k-1] - arr[k] != diff) { c += arr[k-1] - arr[k] - diff; arr[k-1] = arr[k] + diff; }
        }
        System.out.println(c);
    }
}`
    },
    sourceFile: "Count_Elimination_Character.java"
  },

  {
    id: 99,
    title: "Divide Array by GCD",
    question: "Divide all elements of an array by their GCD.\n\nExample: [36,12,9,48,15] → GCD=3 → [12,4,3,16,5]",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Medium",
    tags: ["Arrays", "Math"],
    input: "5\n36 12 9 48 15",
    output: "12 4 3 16 5",
    examples: [{ input: "5\n36 12 9 48 15", output: "12 4 3 16 5" }],
    answer: {
      explanation: "Find GCD of all elements by checking all divisors up to min. Divide each element by GCD.",
      code: `import java.util.*;
/* Divide all array elements by their GCD */
public class DivideArrayByGCD {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int min = arr[0];
        for (int x : arr) if (x < min) min = x;
        int gcd = 1;
        for (int i = 1; i <= min; i++) {
            boolean f = true;
            for (int x : arr) if (x % i != 0) { f = false; break; }
            if (f) gcd = i;
        }
        for (int x : arr) System.out.print(x/gcd + " ");
        System.out.println();
    }
}`
    },
    sourceFile: "DivideArrayByGCD.java"
  },

  {
    id: 100,
    title: "Football League Winner",
    question: "Find the football league winner. Win=3pts, Draw=1pt each, Loss=0pts.\n\nTeams represented as letters A,B...Z. Print winner name and points.",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Hard",
    tags: ["Arrays", "Logic"],
    input: "3\nA B 2-1\nB C 5-6\nC A 2-1",
    output: "C\n6",
    examples: [{ input: "3\nA B 2-1\nB C 5-6\nC A 2-1", output: "C\n6" }],
    answer: {
      explanation: "Parse each match, add 3pts to winner or 1pt each for draw. Find team with max points.",
      code: `import java.util.*;
/* Football league winner — Win=3pts, Draw=1pt each, Loss=0pts */
public class Football_Team {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        int com = n*(n-1)/2;
        Player[] match = new Player[com];
        for (int i = 0; i < com; i++) {
            char t1 = sc.next().charAt(0); char t2 = sc.next().charAt(0); String score = sc.nextLine();
            match[i] = new Player(t1, t2, score);
        }
        int[] point = new int[n];
        for (int i = 0; i < com; i++) {
            String[] num = match[i].score.trim().split("-");
            int c = Integer.parseInt(num[0]) - Integer.parseInt(num[1]);
            if (c > 0) point[(int)match[i].a - 65] += 3;
            else if (c < 0) point[(int)match[i].b - 65] += 3;
            else { point[(int)match[i].a - 65] += 1; point[(int)match[i].b - 65] += 1; }
        }
        int max = point[0]; char Ch = 'A';
        for (int i = 1; i < n; i++) if (point[i] > max) { max = point[i]; Ch = (char)(i + 65); }
        System.out.println(Ch); System.out.println(max);
    }
}
class Player { char a, b; String score; public Player(char a, char b, String score) { this.a=a; this.b=b; this.score=score; } }`
    },
    sourceFile: "Football_Team.java"
  },

  {
    id: 101,
    title: "Keyword or Not",
    question: "Check if a given string is a Go programming keyword.\n\nKeywords: break, case, continue, default, defer, else, for, func, goto, if, map, range, return, struct, type, var",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "return",
    output: "Keyword",
    examples: [
      { input: "return", output: "Keyword" },
      { input: "hello", output: "Not a keyword" }
    ],
    answer: {
      explanation: "Compare input against predefined keyword array. Print Keyword or Not a keyword.",
      code: `import java.util.*;
/* Check if string is a Go keyword */
public class KeywordOrNot {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] keywords = {"break","case","continue","default","defer","else","for","func","goto","if","map","range","return","struct","type","var"};
        String str = sc.nextLine();
        boolean found = false;
        for (String k : keywords) if (k.equalsIgnoreCase(str)) { found = true; break; }
        System.out.println(found ? "Keyword" : "Not a keyword");
    }
}`
    },
    sourceFile: "KeywordOrNot.java"
  },

  {
    id: 102,
    title: "Maximum Difference in Array",
    question: "Find the maximum difference between any two numbers in an array.\n\nExample: [2,9,5,1,7,4] → 9-1 = 8",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays"],
    input: "6\n2 9 5 1 7 4",
    output: "The maximum difference: 8",
    examples: [{ input: "6\n2 9 5 1 7 4", output: "The maximum difference: 8" }],
    answer: {
      explanation: "Sort array, max difference = last element - first element.",
      code: `import java.util.*;
/* Maximum difference = max - min in array */
public class MaximumDifference {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        Arrays.sort(arr);
        System.out.println("The maximum difference: " + (arr[arr.length-1] - arr[0]));
    }
}`
    },
    sourceFile: "MaximumDifference.java"
  },

  {
    id: 103,
    title: "Minimum Number whose Digit Product equals N",
    question: "Find the minimum number B such that the product of its digits equals A.\n\nExample: A=10 → B=25 (2*5=10)",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Hard",
    tags: ["Numbers", "Math"],
    input: "10",
    output: "25",
    examples: [
      { input: "10", output: "25" },
      { input: "100", output: "455" }
    ],
    answer: {
      explanation: "Start from 10, for each B compute product of digits. Return first B where product==A.",
      code: `import java.util.*;
/* Find minimum B where product of digits of B = A */
public class Minimum_Number {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int A = sc.nextInt();
        int B = findMinB(A);
        System.out.println(B > 0 ? B : "No value found");
    }
    public static int findMinB(int A) {
        int B = 10;
        while (true) {
            String b = Integer.toString(B); int product = 1;
            for (int i = 0; i < b.length(); i++) {
                int c = Integer.parseInt(String.valueOf(b.charAt(i)));
                if (c != 0 && A % c == 0) product *= c; else break;
            }
            if (product == A) return B;
            else if (product > A) return 0;
            B++;
        }
    }
}`
    },
    sourceFile: "Minimum_Number.java"
  },

  {
    id: 104,
    title: "Minimum Even Number in Array",
    question: "Find the minimum even number in an array. Print -1 if none.\n\nExample: [5,4,7,3,9,12] → 4",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays"],
    input: "5\n5 4 7 3 9",
    output: "4",
    examples: [
      { input: "5\n5 4 7 3 9", output: "4" },
      { input: "3\n1 3 5", output: "-1" }
    ],
    answer: {
      explanation: "Sort array, find first even element.",
      code: `import java.util.*;
/* Find minimum even number in array, -1 if none */
public class MinimumEvenInArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        Arrays.sort(arr);
        boolean f = true;
        for (int x : arr) if (x % 2 == 0) { System.out.println(x); f = false; break; }
        if (f) System.out.println(-1);
    }
}`
    },
    sourceFile: "MinimumEvenInArray.java"
  },

  {
    id: 105,
    title: "Network Marketing Profit",
    question: "Calculate root node profit from a person at Nth level in a network marketing tree.\nEach level passes P% of their profit to supervisor.\n\nExample: N=3, M=100, P=10 → 10%of(10%of 100) = 1",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Medium",
    tags: ["Numbers", "Math", "Recursion"],
    input: "3\n100\n10",
    output: "1",
    examples: [
      { input: "3\n100\n10", output: "1" },
      { input: "4\n2000\n50", output: "250" }
    ],
    answer: {
      explanation: "Apply P% reduction N-1 times (each level passes P% up). Loop N-1 times: a = a*p/100.",
      code: `import java.util.*;
/* Network marketing profit propagation
 * Each level passes P% of profit up the chain
 */
public class Network_Marketing {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); sc.nextLine();
        int a = sc.nextInt(); sc.nextLine();
        int p = sc.nextInt();
        for (int i = 0; i < n-1; i++) a = a*p/100;
        System.out.println(a > 0 ? a : "NA");
    }
}`
    },
    sourceFile: "Network_Marketing.java"
  },

  {
    id: 106,
    title: "Palindrome Substring Split",
    question: "Split a string into 3 parts where each part is a palindrome.\n\nExample: 'abacaba' → print 3 palindrome substrings or 'Impossible'",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Hard",
    tags: ["Strings", "Palindrome"],
    input: "abacaba",
    output: "a\nbacab\na",
    examples: [
      { input: "abacaba", output: "a\nbacab\na" },
      { input: "abcd", output: "Impossible" }
    ],
    answer: {
      explanation: "Try all split points i and j. Check if str[0..i], str[i..j], str[j..end] are all palindromes.",
      code: `import java.util.*;
/* Split string into 3 palindrome parts */
public class Palindrome_Substring {
    public static boolean isPalindrome(String s) {
        return s.equals(new StringBuilder(s).reverse().toString());
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        int len = str.length();
        boolean flag = false;
        for (int i = 1; i < len-1 && !flag; i++) {
            String s1 = str.substring(0, i);
            if (isPalindrome(s1)) {
                for (int j = i+1; j < len && !flag; j++) {
                    String s2 = str.substring(i, j), s3 = str.substring(j, len);
                    if (isPalindrome(s2) && isPalindrome(s3)) {
                        System.out.println(s1+"\n"+s2+"\n"+s3); flag = true;
                    }
                }
            }
        }
        if (!flag) System.out.println("Impossible");
    }
}`
    },
    sourceFile: "Palindrome_Substring.java"
  },

  {
    id: 107,
    title: "Pangram Check",
    question: "Check if a sentence is a pangram — contains every letter a-z at least once.\n\nExample: 'The quick brown fox jumps over the lazy dog' → Yes",
    marks: 15,
    category: "PRA",
    subcategory: "Strings",
    difficulty: "Easy",
    tags: ["Strings"],
    input: "The quick brown fox jumps over the lazy dog",
    output: "Yes",
    examples: [
      { input: "The quick brown fox jumps over the lazy dog", output: "Yes" },
      { input: "Hello World", output: "No" }
    ],
    answer: {
      explanation: "Count all 26 letter positions using ASCII array. If any is 0, not a pangram.",
      code: `import java.util.*;
/* Pangram check — sentence must contain all 26 letters */
public class Pangram {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().toUpperCase();
        System.out.println(PangramCheck(s) ? "Yes" : "No");
    }
    public static boolean PangramCheck(String s) {
        int[] ascii = new int[26];
        for (char c : s.toCharArray()) if (c >= 'A' && c <= 'Z') ascii[c - 65]++;
        for (int x : ascii) if (x == 0) return false;
        return true;
    }
}`
    },
    sourceFile: "Pangram.java"
  },

  {
    id: 108,
    title: "Pipe Junction Balance",
    question: "Check if a pipe junction is balanced. Add a pipe (positive=incoming, negative=outgoing rated capacity) to balance it.\n\nEach pipe actual capacity = rated - rust factor R.",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Hard",
    tags: ["Math", "Logic"],
    input: "3 3 2\n85 75 95\n70 80 45",
    output: "-62",
    examples: [
      { input: "3 3 2\n85 75 95\n70 80 45", output: "-62" },
      { input: "5 6 1\n10 26 33 40 50\n20 7 53 25 45 10", output: "BALANCED" }
    ],
    answer: {
      explanation: "Compute actual = rated-R for each pipe. Sum inputs - sum outputs. If >0 add outgoing (-val-R), if <0 add incoming (+val+R), else BALANCED.",
      code: `import java.util.*;
/* Pipe junction balance — add a pipe to balance actual flows */
public class Pipe {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int sum1=0, sum2=0;
        int M = sc.nextInt(), N = sc.nextInt(), R = sc.nextInt();
        int[] m = new int[M]; for (int i = 0; i < M; i++) { m[i] = sc.nextInt(); sum1 += m[i]-R; }
        int[] n = new int[N]; for (int i = 0; i < N; i++) { n[i] = sc.nextInt(); sum2 += n[i]-R; }
        int val = sum1 - sum2;
        if (val > 0) System.out.println(-(val+R));
        else if (val == 0) System.out.println("Balanced");
        else System.out.println(val+R);
    }
}`
    },
    sourceFile: "Pipe.java"
  },

  {
    id: 109,
    title: "Replace Each Digit by 9-digit",
    question: "Subtract each digit of a number from 9 (range 0-1000000).\n\nExample: 25843 → 74156",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Easy",
    tags: ["Numbers"],
    input: "25843",
    output: "74156",
    examples: [
      { input: "25843", output: "74156" },
      { input: "58462314", output: "Given integer is out of range" }
    ],
    answer: {
      explanation: "For each digit d, replace with 9-d. Rebuild number from modified digits.",
      code: `import java.util.*;
/* Replace each digit with 9-digit */
public class ReplaceNum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n >= 0 && n <= 1000000) {
            int rem, val = 0, m = 0;
            int orig = n;
            while (orig > 0) { rem = orig%10; val = (int)((9-rem)*Math.pow(10,m)+val); orig /= 10; m++; }
            System.out.println(val);
        } else System.out.println("Given integer is out of range");
    }
}`
    },
    sourceFile: "ReplaceNum.java"
  },

  {
    id: 110,
    title: "Rotate Matrix 90 Degrees",
    question: "Rotate an NxN matrix 90 degrees clockwise in-place.\n\nTranspose + reverse each row.",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Hard",
    tags: ["Arrays", "Matrix"],
    input: "3\n1 2 3\n4 5 6\n7 8 9",
    output: "7 4 1\n8 5 2\n9 6 3",
    examples: [{ input: "3\n1 2 3\n4 5 6\n7 8 9", output: "7 4 1\n8 5 2\n9 6 3" }],
    answer: {
      explanation: "Step 1: Transpose (swap [i][j] with [j][i]). Step 2: Reverse each row. Result = 90° clockwise rotation.",
      code: `import java.util.*;
/* Rotate NxN matrix 90 degrees clockwise
 * Step 1: Transpose  Step 2: Reverse each row
 */
public class Rotate_Matrix {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int row = sc.nextInt(), col = sc.nextInt();
        int[][] arr = new int[row][col];
        for (int i = 0; i < row; i++) for (int j = 0; j < col; j++) arr[i][j] = sc.nextInt();
        int[][] ans = new int[col][row], ans2 = new int[col][row];
        for (int i = 0; i < col; i++) for (int j = 0; j < row; j++) ans[i][j] = arr[j][i];
        for (int i = 0; i < col; i++) for (int j = 0; j < row; j++) ans2[i][j] = ans[i][row-j-1];
        for (int[] r : ans2) { StringBuilder sb = new StringBuilder(); for (int x : r) sb.append(x).append(" "); System.out.println(sb.toString().trim()); }
    }
}`
    },
    sourceFile: "Rotate_Matrix.java"
  },

  {
    id: 111,
    title: "Strange Number Check",
    question: "A strange number N has prime factors, and sqrt(N) < greatest prime factor.\n\nExample: 15 → Strange, 25 → Not Strange",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Medium",
    tags: ["Numbers", "Prime"],
    input: "15",
    output: "Strange",
    examples: [
      { input: "15", output: "Strange" },
      { input: "25", output: "Not Strange" }
    ],
    answer: {
      explanation: "Find all prime factors. If greatest prime factor > sqrt(N) → Strange.",
      code: `import java.util.*;
/* Strange number: has prime factors AND sqrt(N) < greatest prime factor */
public class Strange {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        double root = Math.sqrt(N);
        int[] fac = new int[0];
        for (int i = 1; i < N; i++)
            if (N % i == 0 && isPrime(i)) { fac = Arrays.copyOf(fac, fac.length+1); fac[fac.length-1] = i; Arrays.sort(fac); }
        System.out.println(fac[fac.length-1] > root ? "Strange" : "Not Strange");
    }
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i < n; i++) if (n % i == 0) return false;
        return true;
    }
}`
    },
    sourceFile: "Strange.java"
  },

  {
    id: 112,
    title: "Sub-Sum of Two Diagonals of Matrix",
    question: "Find the absolute difference between sums of two diagonals of a square matrix.\n\nExample: |15-17| = 2",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Medium",
    tags: ["Arrays", "Matrix"],
    input: "3\n1 2 3\n4 5 6\n9 8 9",
    output: "The substraction of the sums of each diagonals : 2",
    examples: [{ input: "3\n1 2 3\n4 5 6\n9 8 9", output: "The substraction of the sums of each diagonals : 2" }],
    answer: {
      explanation: "Primary diagonal: [i][i]. Secondary diagonal: [i][n-1-i]. Sum both, print |sum1-sum2|.",
      code: `import java.util.*;
/* Absolute difference between two diagonal sums of matrix */
public class SubSumOfDiag2Matrix {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] matrix = new int[n][n];
        int sum1 = 0, sum2 = 0;
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++) {
                matrix[r][c] = sc.nextInt();
                if (r == c) sum1 += matrix[r][c];
                if (r == n-1-c) sum2 += matrix[r][c];
            }
        System.out.println("The substraction of the sums of each diagonals : " + Math.abs(sum1-sum2));
    }
}`
    },
    sourceFile: "SubSumOfDiag2Matrix.java"
  },

  {
    id: 113,
    title: "Sum of All Number Combinations",
    question: "Find the sum of all characters and contiguous combinations of a number string.\n\nExample: '321' → 3+2+1+32+21+321 = 380",
    marks: 15,
    category: "PRA",
    subcategory: "Numbers",
    difficulty: "Medium",
    tags: ["Numbers", "Strings"],
    input: "321",
    output: "380",
    examples: [
      { input: "321", output: "380" },
      { input: "12", output: "15" }
    ],
    answer: {
      explanation: "For each start i, for each end j, take substring s[i..j] as a number and add to sum.",
      code: `import java.util.*;
/* Sum of all contiguous substrings treated as numbers */
public class Sum_NumberCombination {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int sum = 0;
        for (int i = 0; i < s.length(); i++)
            for (int j = i; j < s.length(); j++)
                sum += Integer.parseInt(s.substring(i, j+1));
        System.out.println(sum);
    }
}`
    },
    sourceFile: "Sum_NumberCombination.java"
  },

  {
    id: 114,
    title: "Uncommon Elements between Two Sets",
    question: "Find elements in set A that are NOT in set B.\n\nExample: A=[2,5,8,9,4,6,1,7] B=[1,5,3,8,4] → 2 9 6 7",
    marks: 15,
    category: "PRA",
    subcategory: "Arrays",
    difficulty: "Easy",
    tags: ["Arrays", "Collections"],
    input: "8\n5\n2 5 8 9 4 6 1 7\n1 5 3 8 4",
    output: "2 9 6 7",
    examples: [{ input: "8\n5\n2 5 8 9 4 6 1 7\n1 5 3 8 4", output: "2 9 6 7" }],
    answer: {
      explanation: "For each element in A, check if it matches any in B. If not found in B, print it.",
      code: `import java.util.*;
/* Elements of A that are not in B */
public class Uncommon_Element {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt(), n = sc.nextInt();
        int[] A = new int[m], B = new int[n];
        for (int i = 0; i < m; i++) A[i] = sc.nextInt();
        for (int i = 0; i < n; i++) B[i] = sc.nextInt();
        for (int i = 0; i < m; i++) {
            int c = 0;
            for (int j = 0; j < n; j++) if (A[i] != B[j]) c++;
            if (c == n) System.out.print(A[i] + " ");
        }
        System.out.println();
    }
}`
    },
    sourceFile: "Uncommon_Element.java"
  },

  // ── ADMIN ONLY ────────────────────────────────────────────────────────────────
  {
    id: 200,
    title: "Project — Hospital Management System",
    question: `Project Title: Hospital Management System – Web Application with Database Integration

Pages to Develop:

1. Registration Page (User/Patient Signup)
   - Fields: Name, Email, Phone, Password, DOB, Gender
   - Validation for unique email/phone
   - Insert data into User Table

2. Login Page (Authentication)
   - Email + Password authentication
   - Validate from User Table (Role-based: Patient/Admin)
   - Redirect to Dashboard

3. Hospital Case Registering Page
   - Patients can register a case (complaint/symptom)
   - Fields: Case ID, Patient ID, Symptoms, Date, Status (Open/Pending)
   - Stored in Cases Table

4. Patient Details Page
   - Fetch details of logged-in patient
   - Show case history, medical records
   - Linked with User Table + Cases Table

5. Case Raising & Closing Page
   - Case Raising → New entry in Cases Table
   - Case Closing → Update status in Cases Table (Closed)
   - Only Admin/Doctor role can close cases

6. Order History Page
   - Show all previous medical cases of a patient
   - Linked with Cases Table + Patient ID

7. Admin Page (Control Panel)
   - Admin can: View all patients & cases, Assign doctors, Close cases, Manage hospital data

Database Design:

1. Users Table — user_id (PK), name, email, phone, password, role (patient/admin)
2. Cases Table — case_id (PK), patient_id (FK), symptoms, status (open/closed), created_date
3. Doctors Table — doctor_id (PK), name, specialization, email
4. Case_Assignments Table — assignment_id (PK), case_id (FK), doctor_id (FK), assigned_date
5. Order_History Table — order_id (PK), patient_id (FK), case_id (FK), status, date

Steps:
1. Frontend — React: Registration, Login, Dashboard, Case Register, Admin Panel
2. Backend — Node.js/Django: APIs for auth, case management, admin controls
3. Database — MySQL/PostgreSQL: Store users, cases, assignments, history
4. Integration — Connect backend APIs with frontend, JWT authentication
5. Testing — Test login, registration, case creation & closing flow`,
    marks: 35,
    category: "ADMIN",
    subcategory: "Project / Full Stack",
    difficulty: "Hard",
    tags: ["Project", "Full Stack", "Database", "React", "JWT"],
    answer: {
      explanation: "Full stack hospital management system with role-based auth (Patient/Admin), case management, doctor assignment, and order history.",
      code: `// Tech Stack
// Frontend: React + React Router
// Backend: Node.js (Express) or Django
// Database: PostgreSQL / MySQL
// Auth: JWT tokens

// Key API endpoints:
// POST /api/register      → Create user
// POST /api/login         → Auth, return JWT
// POST /api/cases         → Create new case
// GET  /api/cases/:id     → Get patient cases
// PUT  /api/cases/:id     → Close/update case (admin only)
// GET  /api/admin/users   → All users (admin only)
// POST /api/assign        → Assign doctor to case`
    },
    sourceFile: "admin/hospital-management.md",
    adminOnly: true,
  },

];
