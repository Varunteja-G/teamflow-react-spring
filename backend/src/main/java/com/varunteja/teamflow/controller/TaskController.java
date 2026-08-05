package com.varunteja.teamflow.controller;

import com.varunteja.teamflow.dto.TaskStats;
import com.varunteja.teamflow.model.Task;
import com.varunteja.teamflow.model.TaskPriority;
import com.varunteja.teamflow.model.TaskStatus;
import com.varunteja.teamflow.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> getTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) TaskPriority priority,
            @RequestParam(required = false) String search) {
        return service.findAll(status, priority, search);
    }

    @GetMapping("/stats")
    public TaskStats getStats() {
        return service.stats();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@Valid @RequestBody Task task) {
        return service.create(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        return service.update(id, task);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        service.delete(id);
    }
}
