import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';

// --- Static JSON Data (100 unique entries) ---
const employeeData = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', date: '2023-01-15', status: 'Active', amount: 50000, department: 'Engineering', location: 'Mumbai', manager: 'Rohan Malhotra', age: 28 },
    { id: 2, name: 'Vivaan Singh', email: 'vivaan.singh@example.com', date: '2022-11-20', status: 'Inactive', amount: 45000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 35 },
    { id: 3, name: 'Aditya Kumar', email: 'aditya.kumar@example.com', date: '2023-03-10', status: 'Active', amount: 52000, department: 'Sales', location: 'Bangalore', manager: 'Kabir Kapoor', age: 31 },
    { id: 4, name: 'Arjun Gupta', email: 'arjun.gupta@example.com', date: '2023-05-02', status: 'Pending', amount: 30000, department: 'HR', location: 'Chennai', manager: 'Ananya Rao', age: 24 },
    { id: 5, name: 'Sai Patel', email: 'sai.patel@example.com', date: '2022-09-01', status: 'Active', amount: 60000, department: 'Engineering', location: 'Mumbai', manager: 'Rohan Malhotra', age: 32 },
    { id: 6, name: 'Reyansh Reddy', email: 'reyansh.reddy@example.com', date: '2023-02-28', status: 'Active', amount: 55000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 29 },
    { id: 7, name: 'Krishna Verma', email: 'krishna.verma@example.com', date: '2023-07-12', status: 'Inactive', amount: 48000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 41 },
    { id: 8, name: 'Ishaan Mishra', email: 'ishaan.mishra@example.com', date: '2023-06-18', status: 'Active', amount: 70000, department: 'Engineering', location: 'Bangalore', manager: 'Rohan Malhotra', age: 38 },
    { id: 9, name: 'Vihaan Yadav', email: 'vihaan.yadav@example.com', date: '2022-12-30', status: 'Pending', amount: 32000, department: 'Sales', location: 'Pune', manager: 'Kabir Kapoor', age: 26 },
    { id: 10, name: 'Mohammed Khan', email: 'mohammed.khan@example.com', date: '2023-04-05', status: 'Active', amount: 65000, department: 'Finance', location: 'Mumbai', manager: 'Zayn Sheikh', age: 45 },
    { id: 11, name: 'Ananya Rao', email: 'ananya.rao@example.com', date: '2023-08-22', status: 'Active', amount: 58000, department: 'HR', location: 'Chennai', manager: 'Corporate', age: 39 },
    { id: 12, name: 'Diya Nair', email: 'diya.nair@example.com', date: '2022-10-14', status: 'Inactive', amount: 43000, department: 'Marketing', location: 'Kolkata', manager: 'Priya Mehta', age: 29 },
    { id: 13, name: 'Myra Iyer', email: 'myra.iyer@example.com', date: '2023-01-25', status: 'Active', amount: 51000, department: 'Sales', location: 'Delhi', manager: 'Kabir Kapoor', age: 27 },
    { id: 14, name: 'Saanvi Jain', email: 'saanvi.jain@example.com', date: '2023-09-03', status: 'Pending', amount: 35000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 25 },
    { id: 15, name: 'Amaira Menon', email: 'amaira.menon@example.com', date: '2022-08-11', status: 'Active', amount: 62000, department: 'Engineering', location: 'Pune', manager: 'Rohan Malhotra', age: 33 },
    { id: 16, name: 'Pari Aggarwal', email: 'pari.aggarwal@example.com', date: '2023-03-20', status: 'Active', amount: 53000, department: 'Finance', location: 'Mumbai', manager: 'Zayn Sheikh', age: 30 },
    { id: 17, name: 'Kiara Bhat', email: 'kiara.bhat@example.com', date: '2023-10-01', status: 'Inactive', amount: 49000, department: 'HR', location: 'Chennai', manager: 'Ananya Rao', age: 36 },
    { id: 18, name: 'Aadhya Murthy', email: 'aadhya.murthy@example.com', date: '2023-05-15', status: 'Active', amount: 75000, department: 'Engineering', location: 'Bangalore', manager: 'Rohan Malhotra', age: 42 },
    { id: 19, name: 'Anika Reddy', email: 'anika.reddy@example.com', date: '2022-11-05', status: 'Pending', amount: 33000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 22 },
    { id: 20, name: 'Navya Kumar', email: 'navya.kumar@example.com', date: '2023-04-19', status: 'Active', amount: 68000, department: 'Sales', location: 'Mumbai', manager: 'Kabir Kapoor', age: 34 },
    { id: 21, name: 'Advait Joshi', email: 'advait.joshi@example.com', date: '2023-02-11', status: 'Active', amount: 54000, department: 'Product', location: 'Pune', manager: 'Siddharth Pillai', age: 28 },
    { id: 22, name: 'Aryan Das', email: 'aryan.das@example.com', date: '2022-07-29', status: 'Inactive', amount: 46000, department: 'Finance', location: 'Kolkata', manager: 'Zayn Sheikh', age: 51 },
    { id: 23, name: 'Dhruv Mehra', email: 'dhruv.mehra@example.com', date: '2023-06-09', status: 'Active', amount: 59000, department: 'Engineering', location: 'Hyderabad', manager: 'Rohan Malhotra', age: 31 },
    { id: 24, name: 'Kabir Kapoor', email: 'kabir.kapoor@example.com', date: '2021-11-12', status: 'Active', amount: 98000, department: 'Sales', location: 'Mumbai', manager: 'Corporate', age: 43 },
    { id: 25, name: 'Parth Shah', email: 'parth.shah@example.com', date: '2022-06-01', status: 'Active', amount: 61000, department: 'HR', location: 'Pune', manager: 'Ananya Rao', age: 37 },
    { id: 26, name: 'Rohan Malhotra', email: 'rohan.malhotra@example.com', date: '2021-01-30', status: 'Active', amount: 120000, department: 'Engineering', location: 'Bangalore', manager: 'Corporate', age: 48 },
    { id: 27, name: 'Siddharth Pillai', email: 'siddharth.pillai@example.com', date: '2021-08-08', status: 'Active', amount: 110000, department: 'Product', location: 'Hyderabad', manager: 'Corporate', age: 46 },
    { id: 28, name: 'Veer Chawla', email: 'veer.chawla@example.com', date: '2023-07-21', status: 'Active', amount: 72000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 33 },
    { id: 29, name: 'Yash Desai', email: 'yash.desai@example.com', date: '2022-10-02', status: 'Pending', amount: 36000, department: 'Sales', location: 'Ahmedabad', manager: 'Kabir Kapoor', age: 23 },
    { id: 30, name: 'Zayn Sheikh', email: 'zayn.sheikh@example.com', date: '2021-05-28', status: 'Active', amount: 115000, department: 'Finance', location: 'Mumbai', manager: 'Corporate', age: 52 },
    { id: 31, name: 'Eva Ghosh', email: 'eva.ghosh@example.com', date: '2023-09-14', status: 'Active', amount: 56000, department: 'Engineering', location: 'Kolkata', manager: 'Rohan Malhotra', age: 29 },
    { id: 32, name: 'Fatima Ahmed', email: 'fatima.ahmed@example.com', date: '2022-05-18', status: 'Inactive', amount: 44000, department: 'Sales', location: 'Lucknow', manager: 'Kabir Kapoor', age: 55 },
    { id: 33, name: 'Gauri Patil', email: 'gauri.patil@example.com', date: '2023-02-04', status: 'Active', amount: 50000, department: 'Product', location: 'Pune', manager: 'Siddharth Pillai', age: 27 },
    { id: 34, name: 'Heer Singhania', email: 'heer.singhania@example.com', date: '2023-12-01', status: 'Pending', amount: 40000, department: 'HR', location: 'Jaipur', manager: 'Ananya Rao', age: 21 },
    { id: 35, name: 'Inaya Thakur', email: 'inaya.thakur@example.com', date: '2022-04-10', status: 'Active', amount: 64000, department: 'Marketing', location: 'Chandigarh', manager: 'Priya Mehta', age: 36 },
    { id: 36, name: 'Jiya Bajaj', email: 'jiya.bajaj@example.com', date: '2023-03-05', status: 'Active', amount: 52500, department: 'Finance', location: 'Mumbai', manager: 'Zayn Sheikh', age: 30 },
    { id: 37, name: 'Kavya Sawant', email: 'kavya.sawant@example.com', date: '2023-10-20', status: 'Inactive', amount: 48500, department: 'Engineering', location: 'Pune', manager: 'Rohan Malhotra', age: 31 },
    { id: 38, name: 'Leah Anand', email: 'leah.anand@example.com', date: '2023-06-25', status: 'Active', amount: 71000, department: 'Sales', location: 'Bangalore', manager: 'Kabir Kapoor', age: 38 },
    { id: 39, name: 'Mira Dubey', email: 'mira.dubey@example.com', date: '2022-09-15', status: 'Pending', amount: 34000, department: 'Product', location: 'Delhi', manager: 'Siddharth Pillai', age: 24 },
    { id: 40, name: 'Nia Khanna', email: 'nia.khanna@example.com', date: '2023-04-30', status: 'Active', amount: 67000, department: 'HR', location: 'Mumbai', manager: 'Ananya Rao', age: 40 },
    { id: 41, name: 'Omar Abdullah', email: 'omar.abdullah@example.com', date: '2023-01-05', status: 'Active', amount: 49000, department: 'Marketing', location: 'Srinagar', manager: 'Priya Mehta', age: 29 },
    { id: 42, name: 'Priya Mehta', email: 'priya.mehta@example.com', date: '2021-08-25', status: 'Active', amount: 105000, department: 'Marketing', location: 'Delhi', manager: 'Corporate', age: 44 },
    { id: 43, name: 'Qamar Ali', email: 'qamar.ali@example.com', date: '2023-07-07', status: 'Active', amount: 53500, department: 'Finance', location: 'Lucknow', manager: 'Zayn Sheikh', age: 32 },
    { id: 44, name: 'Rhea Choudhary', email: 'rhea.choudhary@example.com', date: '2023-11-25', status: 'Pending', amount: 39000, department: 'Engineering', location: 'Chandigarh', manager: 'Rohan Malhotra', age: 23 },
    { id: 45, name: 'Sara Lamba', email: 'sara.lamba@example.com', date: '2022-03-12', status: 'Active', amount: 66000, department: 'Sales', location: 'Jaipur', manager: 'Kabir Kapoor', age: 37 },
    { id: 46, name: 'Tara Sethi', email: 'tara.sethi@example.com', date: '2023-02-18', status: 'Active', amount: 51500, department: 'Product', location: 'Bangalore', manager: 'Siddharth Pillai', age: 28 },
    { id: 47, name: 'Uma Krishnan', email: 'uma.krishnan@example.com', date: '2023-09-30', status: 'Inactive', amount: 47500, department: 'HR', location: 'Chennai', manager: 'Ananya Rao', age: 58 },
    { id: 48, name: 'Veda Puri', email: 'veda.puri@example.com', date: '2023-05-09', status: 'Active', amount: 73000, department: 'Marketing', location: 'Mumbai', manager: 'Priya Mehta', age: 39 },
    { id: 49, name: 'Zara Begum', email: 'zara.begum@example.com', date: '2022-12-08', status: 'Pending', amount: 37000, department: 'Finance', location: 'Hyderabad', manager: 'Zayn Sheikh', age: 26 },
    { id: 50, name: 'Ayan Banerjee', email: 'ayan.banerjee@example.com', date: '2023-08-15', status: 'Active', amount: 69000, department: 'Engineering', location: 'Kolkata', manager: 'Rohan Malhotra', age: 35 },
    { id: 51, name: 'Bhavna Chauhan', email: 'bhavna.chauhan@example.com', date: '2022-01-20', status: 'Active', amount: 82000, department: 'Product', location: 'Pune', manager: 'Siddharth Pillai', age: 33 },
    { id: 52, name: 'Chetan Datta', email: 'chetan.datta@example.com', date: '2023-11-11', status: 'Inactive', amount: 41000, department: 'Sales', location: 'Delhi', manager: 'Kabir Kapoor', age: 28 },
    { id: 53, name: 'Devika Gill', email: 'devika.gill@example.com', date: '2022-04-25', status: 'Active', amount: 95000, department: 'Engineering', location: 'Bangalore', manager: 'Rohan Malhotra', age: 39 },
    { id: 54, name: 'Ehan Johar', email: 'ehan.johar@example.com', date: '2023-06-30', status: 'Pending', amount: 38000, department: 'HR', location: 'Mumbai', manager: 'Ananya Rao', age: 23 },
    { id: 55, name: 'Falguni Khanna', email: 'falguni.khanna@example.com', date: '2021-09-05', status: 'Active', amount: 105000, department: 'Marketing', location: 'Chennai', manager: 'Priya Mehta', age: 42 },
    { id: 56, name: 'Girish Lal', email: 'girish.lal@example.com', date: '2023-08-01', status: 'Active', amount: 63000, department: 'Finance', location: 'Kolkata', manager: 'Zayn Sheikh', age: 31 },
    { id: 57, name: 'Hina Mathur', email: 'hina.mathur@example.com', date: '2022-02-14', status: 'Inactive', amount: 54000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 29 },
    { id: 58, name: 'Ira Naidu', email: 'ira.naidu@example.com', date: '2023-07-18', status: 'Active', amount: 78000, department: 'Sales', location: 'Pune', manager: 'Kabir Kapoor', age: 36 },
    { id: 59, name: 'Jay Oberoi', email: 'jay.oberoi@example.com', date: '2022-12-22', status: 'Pending', amount: 42000, department: 'Engineering', location: 'Mumbai', manager: 'Rohan Malhotra', age: 25 },
    { id: 60, name: 'Juhi Pandey', email: 'juhi.pandey@example.com', date: '2023-04-12', status: 'Active', amount: 88000, department: 'HR', location: 'Delhi', manager: 'Ananya Rao', age: 38 },
    { id: 61, name: 'Kian Qureshi', email: 'kian.qureshi@example.com', date: '2022-07-07', status: 'Active', amount: 71000, department: 'Marketing', location: 'Bangalore', manager: 'Priya Mehta', age: 32 },
    { id: 62, name: 'Lavanya Rana', email: 'lavanya.rana@example.com', date: '2023-01-01', status: 'Inactive', amount: 49000, department: 'Finance', location: 'Chennai', manager: 'Zayn Sheikh', age: 27 },
    { id: 63, name: 'Manan Saxena', email: 'manan.saxena@example.com', date: '2022-05-19', status: 'Active', amount: 92000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 40 },
    { id: 64, name: 'Mihika Tandon', email: 'mihika.tandon@example.com', date: '2023-09-28', status: 'Pending', amount: 37000, department: 'Sales', location: 'Pune', manager: 'Kabir Kapoor', age: 22 },
    { id: 65, name: 'Nirav Varma', email: 'nirav.varma@example.com', date: '2021-11-30', status: 'Active', amount: 110000, department: 'Engineering', location: 'Mumbai', manager: 'Rohan Malhotra', age: 45 },
    { id: 66, name: 'Nandini Wadia', email: 'nandini.wadia@example.com', date: '2023-03-15', status: 'Active', amount: 68000, department: 'HR', location: 'Delhi', manager: 'Ananya Rao', age: 34 },
    { id: 67, name: 'Ojaswini Basu', email: 'ojaswini.basu@example.com', date: '2022-08-20', status: 'Inactive', amount: 51000, department: 'Marketing', location: 'Kolkata', manager: 'Priya Mehta', age: 30 },
    { id: 68, name: 'Palak Johar', email: 'palak.johar@example.com', date: '2023-10-10', status: 'Active', amount: 85000, department: 'Finance', location: 'Bangalore', manager: 'Zayn Sheikh', age: 37 },
    { id: 69, name: 'Pranav Gill', email: 'pranav.gill@example.com', date: '2022-03-03', status: 'Pending', amount: 43000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 26 },
    { id: 70, name: 'Qabil Lal', email: 'qabil.lal@example.com', date: '2023-05-25', status: 'Active', amount: 99000, department: 'Sales', location: 'Chennai', manager: 'Kabir Kapoor', age: 41 },
    { id: 71, name: 'Raj Mathur', email: 'raj.mathur@example.com', date: '2021-10-18', status: 'Active', amount: 115000, department: 'Engineering', location: 'Pune', manager: 'Rohan Malhotra', age: 47 },
    { id: 72, name: 'Ridhima Naidu', email: 'ridhima.naidu@example.com', date: '2023-02-08', status: 'Active', amount: 73000, department: 'HR', location: 'Mumbai', manager: 'Ananya Rao', age: 35 },
    { id: 73, name: 'Samar Oberoi', email: 'samar.oberoi@example.com', date: '2022-06-12', status: 'Inactive', amount: 58000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 31 },
    { id: 74, name: 'Samaira Pandey', email: 'samaira.pandey@example.com', date: '2023-12-25', status: 'Active', amount: 90000, department: 'Finance', location: 'Bangalore', manager: 'Zayn Sheikh', age: 39 },
    { id: 75, name: 'Tapan Qureshi', email: 'tapan.qureshi@example.com', date: '2022-09-09', status: 'Pending', amount: 45000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 24 },
    { id: 76, name: 'Tanya Rana', email: 'tanya.rana@example.com', date: '2023-04-01', status: 'Active', amount: 81000, department: 'Sales', location: 'Chennai', manager: 'Kabir Kapoor', age: 36 },
    { id: 77, name: 'Uday Saxena', email: 'uday.saxena@example.com', date: '2022-01-15', status: 'Active', amount: 102000, department: 'Engineering', location: 'Pune', manager: 'Rohan Malhotra', age: 43 },
    { id: 78, name: 'Urvi Tandon', email: 'urvi.tandon@example.com', date: '2023-08-18', status: 'Active', amount: 76000, department: 'HR', location: 'Mumbai', manager: 'Ananya Rao', age: 33 },
    { id: 79, name: 'Varun Varma', email: 'varun.varma@example.com', date: '2022-11-28', status: 'Inactive', amount: 62000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 32 },
    { id: 80, name: 'Vanya Wadia', email: 'vanya.wadia@example.com', date: '2023-06-06', status: 'Active', amount: 94000, department: 'Finance', location: 'Bangalore', manager: 'Zayn Sheikh', age: 40 },
    { id: 81, name: 'Wazir Basu', email: 'wazir.basu@example.com', date: '2022-10-01', status: 'Pending', amount: 48000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 27 },
    { id: 82, name: 'Xavier Johar', email: 'xavier.johar@example.com', date: '2023-03-28', status: 'Active', amount: 89000, department: 'Sales', location: 'Chennai', manager: 'Kabir Kapoor', age: 38 },
    { id: 83, name: 'Yashvi Gill', email: 'yashvi.gill@example.com', date: '2022-04-04', status: 'Active', amount: 108000, department: 'Engineering', location: 'Pune', manager: 'Rohan Malhotra', age: 44 },
    { id: 84, name: 'Yug Lal', email: 'yug.lal@example.com', date: '2023-09-19', status: 'Active', amount: 79000, department: 'HR', location: 'Mumbai', manager: 'Ananya Rao', age: 34 },
    { id: 85, name: 'Zoya Mathur', email: 'zoya.mathur@example.com', date: '2022-08-08', status: 'Inactive', amount: 65000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 33 },
    { id: 86, name: 'Zuber Naidu', email: 'zuber.naidu@example.com', date: '2023-07-27', status: 'Active', amount: 97000, department: 'Finance', location: 'Bangalore', manager: 'Zayn Sheikh', age: 41 },
    { id: 87, name: 'Aahana Oberoi', email: 'aahana.oberoi@example.com', date: '2022-02-22', status: 'Pending', amount: 50000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 28 },
    { id: 88, name: 'Abeer Pandey', email: 'abeer.pandey@example.com', date: '2023-01-28', status: 'Active', amount: 84000, department: 'Sales', location: 'Chennai', manager: 'Kabir Kapoor', age: 37 },
    { id: 89, name: 'Bodhi Qureshi', email: 'bodhi.qureshi@example.com', date: '2021-12-12', status: 'Active', amount: 112000, department: 'Engineering', location: 'Pune', manager: 'Rohan Malhotra', age: 46 },
    { id: 90, name: 'Charvi Rana', email: 'charvi.rana@example.com', date: '2023-11-01', status: 'Active', amount: 77000, department: 'HR', location: 'Mumbai', manager: 'Ananya Rao', age: 32 },
    { id: 91, name: 'Darsh Saxena', email: 'darsh.saxena@example.com', date: '2022-06-18', status: 'Inactive', amount: 69000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 35 },
    { id: 92, name: 'Elina Tandon', email: 'elina.tandon@example.com', date: '2023-10-25', status: 'Active', amount: 91000, department: 'Finance', location: 'Bangalore', manager: 'Zayn Sheikh', age: 39 },
    { id: 93, name: 'Faiyaz Varma', email: 'faiyaz.varma@example.com', date: '2022-05-05', status: 'Pending', amount: 52000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 29 },
    { id: 94, name: 'Gitanjali Wadia', email: 'gitanjali.wadia@example.com', date: '2023-02-19', status: 'Active', amount: 86000, department: 'Sales', location: 'Chennai', manager: 'Kabir Kapoor', age: 38 },
    { id: 95, name: 'Harish Basu', email: 'harish.basu@example.com', date: '2022-09-30', status: 'Active', amount: 104000, department: 'Engineering', location: 'Pune', manager: 'Rohan Malhotra', age: 42 },
    { id: 96, name: 'Ishank Johar', email: 'ishank.johar@example.com', date: '2023-05-11', status: 'Active', amount: 80000, department: 'HR', location: 'Mumbai', manager: 'Ananya Rao', age: 31 },
    { id: 97, name: 'Kashvi Gill', email: 'kashvi.gill@example.com', date: '2022-03-21', status: 'Inactive', amount: 72000, department: 'Marketing', location: 'Delhi', manager: 'Priya Mehta', age: 36 },
    { id: 98, name: 'Laksh Lal', email: 'laksh.lal@example.com', date: '2023-08-30', status: 'Active', amount: 93000, department: 'Finance', location: 'Bangalore', manager: 'Zayn Sheikh', age: 40 },
    { id: 99, name: 'Oviya Mathur', email: 'oviya.mathur@example.com', date: '2022-10-15', status: 'Pending', amount: 55000, department: 'Product', location: 'Hyderabad', manager: 'Siddharth Pillai', age: 30 },
    { id: 100, name: 'Qirat Naidu', email: 'qirat.naidu@example.com', date: '2023-04-22', status: 'Active', amount: 83000, department: 'Sales', location: 'Chennai', manager: 'Kabir Kapoor', age: 35 },
];

// --- Column Configuration ---
const allTableColumns = [
    { key: 'name', label: 'Employee' }, { key: 'id', label: 'ID' }, { key: 'department', label: 'Department' },
    { key: 'status', label: 'Status' }, { key: 'age', label: 'Age' }, { key: 'date', label: 'Joining Date' },
    { key: 'amount', label: 'Salary' }, { key: 'email', label: 'Email' }, { key: 'location', label: 'Location' },
    { key: 'manager', label: 'Manager' },
];

// --- Helper Components & Functions ---
const avatarColorClasses = [
    'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300', 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300',
    'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300', 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300',
    'bg-lime-100 text-lime-600 dark:bg-lime-500/20 dark:text-lime-300', 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300',
    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300', 'bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300',
    'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300', 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300',
    'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300', 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300',
    'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300', 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300',
    'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-300', 'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300',
    'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300',
];

const getAvatarColor = (char) => {
    const charCode = char.toUpperCase().charCodeAt(0);
    return avatarColorClasses[charCode % avatarColorClasses.length];
};

const SortIndicator = ({ direction, priority }) => (
    <div className="flex items-center gap-1">
        <div className="text-indigo-600 bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-300 rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">{priority}</div>
        <div className={`transition-transform duration-200 ${direction === 'descending' ? 'rotate-180' : ''}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
    </div>
);

const StatusBadge = ({ status }) => {
    const classes = { 
        'Active': 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-300 dark:ring-green-400/20', 
        'Inactive': 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-400/20', 
        'Pending': 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20' 
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ring-1 ring-inset inline-block ${classes[status]}`}>{status}</span>;
};

// --- Main App Component ---
export default function App() {
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState([{ key: 'name', direction: 'ascending' }]);
    const [visibleColumns, setVisibleColumns] = useState(['name', 'id', 'department', 'status', 'amount']);
    const [isColumnManagerOpen, setIsColumnManagerOpen] = useState(false);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const dropdownRef = useRef(null);
    const [visibleRows, setVisibleRows] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const observer = useRef(null);
    const sentinelRef = useRef(null);
    
    const salaryBounds = useMemo(() => ({ min: Math.min(...employeeData.map(e => e.amount)), max: Math.max(...employeeData.map(e => e.amount)) }), []);
    const ageBounds = useMemo(() => ({ min: Math.min(...employeeData.map(e => e.age)), max: Math.max(...employeeData.map(e => e.age)) }), []);
    const [salaryRange, setSalaryRange] = useState({ min: salaryBounds.min, max: salaryBounds.max });
    const [ageRange, setAgeRange] = useState({ min: ageBounds.min, max: ageBounds.max });
    const [statusFilter, setStatusFilter] = useState(['Active', 'Inactive', 'Pending']);
    
    useEffect(() => { setVisibleRows(20); }, [filter, sortConfig, salaryRange, ageRange, statusFilter]);
    
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') { root.classList.add('dark'); } 
        else { root.classList.remove('dark'); }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event) => dropdownRef.current && !dropdownRef.current.contains(event.target) && setIsColumnManagerOpen(false);
        const handleScroll = () => setShowBackToTop(window.scrollY > 300);
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener('scroll', handleScroll);
        return () => { document.removeEventListener("mousedown", handleClickOutside); window.removeEventListener('scroll', handleScroll); };
    }, []);

    const processedData = useMemo(() => {
        return [...employeeData]
            .filter(item => {
                const searchMatch = Object.values(item).some(val => String(val).toLowerCase().includes(filter.toLowerCase()));
                const salaryMatch = item.amount >= salaryRange.min && item.amount <= salaryRange.max;
                const ageMatch = item.age >= ageRange.min && item.age <= ageRange.max;
                const statusMatch = statusFilter.includes(item.status);
                return searchMatch && salaryMatch && ageMatch && statusMatch;
            })
            .sort((a, b) => {
                for (const sort of sortConfig) {
                    const aValue = a[sort.key], bValue = b[sort.key];
                    if (typeof aValue === 'number' && typeof bValue === 'number') { const diff = aValue - bValue; if (diff !== 0) return sort.direction === 'ascending' ? diff : -diff; } 
                    else { const diff = String(aValue).localeCompare(String(bValue)); if (diff !== 0) return sort.direction === 'ascending' ? diff : -diff; }
                }
                return 0;
            });
    }, [filter, sortConfig, salaryRange, ageRange, statusFilter]);
    
    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && visibleRows < processedData.length) {
                setIsLoading(true);
                setTimeout(() => {
                    setVisibleRows(prev => prev + 20);
                    setIsLoading(false);
                }, 500); 
            }
        });

        const currentSentinel = sentinelRef.current;
        if (currentSentinel) observer.current.observe(currentSentinel);

        return () => {
            if(currentSentinel) observer.current.unobserve(currentSentinel);
        }
    }, [isLoading, visibleRows, processedData.length]);


    const handleSort = (key, event) => {
        const isShiftClick = event.shiftKey;
        let newSortConfig = [...sortConfig];
        const existingSortIndex = newSortConfig.findIndex(s => s.key === key);
        if (isShiftClick) {
            if (existingSortIndex > -1) newSortConfig[existingSortIndex] = { ...newSortConfig[existingSortIndex], direction: newSortConfig[existingSortIndex].direction === 'ascending' ? 'descending' : 'ascending' };
            else newSortConfig.push({ key, direction: 'ascending' });
        } else {
            if (existingSortIndex > -1) newSortConfig = [{ key, direction: newSortConfig[existingSortIndex].direction === 'ascending' ? 'descending' : 'ascending' }];
            else newSortConfig = [{ key, direction: 'ascending' }];
        }
        setSortConfig(newSortConfig);
    };
    
    const resetFilters = () => { setSalaryRange(salaryBounds); setAgeRange(ageBounds); setStatusFilter(['Active', 'Inactive', 'Pending']); };
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const dataToRender = processedData.slice(0, visibleRows);
    const activeColumns = allTableColumns.filter(c => visibleColumns.includes(c.key));

    return (
        <div className="bg-[#f8f7f4] dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-300 px-4 pt-8 pb-32 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 text-center"><h1 className="text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">Data Table Using React</h1><p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">View, Sort and Filter data</p></header>

                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-700">
                        <input type="text" placeholder="Search anything..." value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full sm:max-w-xs pl-4 pr-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                        <div className="flex items-center gap-2">
                             <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="relative flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition overflow-hidden">
                                <div className={`absolute transition-all duration-300 ease-in-out transform ${theme === 'dark' ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                                </div>
                                <div className={`absolute transition-all duration-300 ease-in-out transform ${theme === 'light' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                                </div>
                            </button>
                            <button onClick={() => setIsFilterPanelOpen(p => !p)} className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition">Filters</button>
                            <div className="relative z-20" ref={dropdownRef}>
                                <button onClick={() => setIsColumnManagerOpen(p => !p)} className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition">View</button>
                                <div className={`absolute right-0 mt-2 w-56 origin-top-right transition-all duration-300 ease-in-out transform ${isColumnManagerOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}><div className="bg-white dark:bg-slate-700 rounded-lg shadow-xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 p-2">{allTableColumns.map(col => <label key={col.key} className="flex items-center space-x-3 px-3 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md cursor-pointer"><input type="checkbox" checked={visibleColumns.includes(col.key)} onChange={() => setVisibleColumns(p => p.includes(col.key) ? p.filter(k => k !== col.key) : [...p, col.key])} className="h-4 w-4 rounded border-slate-300 dark:border-slate-500 text-indigo-600 focus:ring-indigo-500" /><span className="text-sm text-slate-700 dark:text-slate-300 select-none">{col.label}</span></label>)}</div></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFilterPanelOpen ? 'max-h-96' : 'max-h-0'}`}><div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20"><div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6"><div><label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">Salary (Max: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(salaryRange.max)})</label><input type="range" min={salaryBounds.min} max={salaryBounds.max} value={salaryRange.max} onChange={e => setSalaryRange({...salaryRange, max: Number(e.target.value)})} className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"/></div><div><label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">Age (Max: {ageRange.max})</label><input type="range" min={ageBounds.min} max={ageBounds.max} value={ageRange.max} onChange={e => setAgeRange({...ageRange, max: Number(e.target.value)})} className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"/></div><div><label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">Status</label><div className="flex flex-wrap gap-4 pt-2">{['Active', 'Inactive', 'Pending'].map(s => <label key={s} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={statusFilter.includes(s)} onChange={() => setStatusFilter(p => p.includes(s) ? p.filter(i => i !== s) : [...p, s])} className="h-4 w-4 rounded border-slate-300 dark:border-slate-500 text-indigo-600 focus:ring-indigo-500"/>{s}</label>)}</div></div></div><button onClick={resetFilters} className="mt-6 px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded">Reset All Filters</button></div></div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-700/50 border-b-2 border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                                <tr>{activeColumns.map(col => { const sortInfo = sortConfig.find(s => s.key === col.key); return (<th key={col.key} className="px-6 py-3 text-left cursor-pointer select-none bg-slate-50 dark:bg-slate-800" onClick={(e) => handleSort(col.key, e)}><div className={`flex items-center gap-2 transition-colors ${sortInfo ? 'text-indigo-600 dark:text-indigo-300 font-bold' : 'hover:text-slate-900 dark:hover:text-white'}`}>{col.label} {sortInfo && <SortIndicator direction={sortInfo.direction} priority={sortConfig.findIndex(s => s.key === col.key) + 1} />}</div></th>)})}</tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {dataToRender.map(item => (<tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">{activeColumns.map(col => (<td key={col.key} className="px-6 py-4 whitespace-nowrap">{col.key === 'name' ? (<div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getAvatarColor(item.name.charAt(0))}`}>{item.name.charAt(0)}</div><div><div className="font-medium text-slate-900 dark:text-white">{item.name}</div><div className="text-slate-500 dark:text-slate-400">{item.email}</div></div></div>) : col.key === 'status' ? <StatusBadge status={item.status} /> : col.key === 'amount' ? <span className="font-medium text-slate-900 dark:text-white">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(item.amount)}</span> : <span className="text-slate-600 dark:text-slate-400">{item[col.key]}</span>}</td>))}</tr>))}
                            </tbody>
                        </table>
                        <div ref={sentinelRef} />
                    </div>
                    
                    {isLoading && <div className="text-center p-4 text-slate-500 dark:text-slate-400 sticky left-0">Loading more...</div>}
                    {processedData.length === 0 && <div className="text-center py-16 text-slate-500 dark:text-slate-400 sticky left-0">No employees match the current filters.</div>}
                </div>
            </div>
            
            <button onClick={scrollToTop} className={`fixed bottom-24 right-6 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all duration-300 transform ${showBackToTop ? 'scale-100' : 'scale-0'}`}><svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg></button>
        </div>
    );
}
