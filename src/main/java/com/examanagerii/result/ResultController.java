package com.examanagerii.result;

import com.examanagerii.exam.Exam;
import com.examanagerii.exam.ExamController;
import com.examanagerii.exam.ExamRepository;
import com.examanagerii.group.Group;
import com.examanagerii.group.GroupController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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

    @Autowired
    ExamRepository examRepository;

    @GetMapping("/myResults")
    public List<Result> getMyResults() {

        List<Exam> myExams = examController.getMyExams();
        List<Group> myGroups = groupController.getMyGroups();

        return null;
    }

    @GetMapping("/forStudent/{studId}/{examId}/{groupId}")
    public Result getResultForStudent(
            @PathVariable("studId") String studId,
            @PathVariable("examId") String examId,
            @PathVariable("groupId") String groupId) {
        Optional<Result> optionalResult = resultRepository.findResultByStudentIdAndExamId(studId, examId);
        if (optionalResult.isPresent()){
            return optionalResult.get();
        } else {
            Exam exam = examRepository.findById(examId)
                    .orElseThrow(() -> new NoSuchElementException(examId));
            Result result = new Result();
            result.setExercises(exam.getExercises());
            result.setExamId(examId);
            result.setStudentId(studId);
            result.setGroupId(groupId);

            return resultRepository.save(result);
        }
    }

    @PutMapping("save")
    public void saveResult(@RequestBody Result result) {

        result.setExercises(result.getExercises());
        resultRepository.save(result);
    }


    @PutMapping("create")
    public void createResults(@RequestBody List<Result> results) {
        resultRepository.saveAll(results);
    }

}
