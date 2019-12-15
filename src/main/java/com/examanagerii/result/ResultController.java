package com.examanagerii.result;

import com.examanagerii.exam.Exam;
import com.examanagerii.exam.ExamController;
import com.examanagerii.group.Group;
import com.examanagerii.group.GroupController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/results")
public class ResultController {

    @Autowired
    ExamController examController;

    @Autowired
    GroupController groupController;

    @Autowired
    ResultRepository resultRepository;

    @GetMapping("/myResults")
    public List<Result> getMyResults() {

        List<Exam> myExams = examController.getMyExams();
        List<Group> myGroups = groupController.getMyGroups();

        List<Result> myResults = resultRepository.findMyResults(
                myExams.stream().map(Exam::getId).collect(Collectors.toList()),
                myGroups.stream().map(Group::getId).collect(Collectors.toList())
        );

        return myResults;
    }

    @PutMapping("create")
    public void createResults(@RequestBody List<Result> results) {
        resultRepository.saveAll(results);
    }

}
