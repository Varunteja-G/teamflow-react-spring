package com.varunteja.teamflow.service;

import com.varunteja.teamflow.dto.TaskStats;
import com.varunteja.teamflow.exception.ResourceNotFoundException;
import com.varunteja.teamflow.model.Task;
import com.varunteja.teamflow.model.TaskPriority;
import com.varunteja.teamflow.model.TaskStatus;
import com.varunteja.teamflow.repository.TaskRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

@Service
public class TaskService {
    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> findAll(TaskStatus status, TaskPriority priority, String search) {
        String normalizedSearch = search == null ? "" : search.trim().toLowerCase(Locale.ROOT);
        return repository.findAll(Sort.by(Sort.Direction.DESC, "updatedAt")).stream()
                .filter(task -> status == null || task.getStatus() == status)
                .filter(task -> priority == null || task.getPriority() == priority)
                .filter(task -> normalizedSearch.isBlank()
                        || task.getTitle().toLowerCase(Locale.ROOT).contains(normalizedSearch)
                        || task.getAssignee().toLowerCase(Locale.ROOT).contains(normalizedSearch)
                        || (task.getDescription() != null
                            && task.getDescription().toLowerCase(Locale.ROOT).contains(normalizedSearch)))
                .toList();
    }

    public Task findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task " + id + " was not found"));
    }

    public Task create(Task task) {
        task.setId(null);
        return repository.save(task);
    }

    public Task update(Long id, Task input) {
        Task task = findById(id);
        task.setTitle(input.getTitle());
        task.setDescription(input.getDescription());
        task.setAssignee(input.getAssignee());
        task.setStatus(input.getStatus());
        task.setPriority(input.getPriority());
        task.setDueDate(input.getDueDate());
        return repository.save(task);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }

    public TaskStats stats() {
        List<Task> tasks = repository.findAll();
        LocalDate today = LocalDate.now();
        long completed = tasks.stream().filter(task -> task.getStatus() == TaskStatus.DONE).count();
        long overdue = tasks.stream()
                .filter(task -> task.getDueDate() != null)
                .filter(task -> task.getDueDate().isBefore(today))
                .filter(task -> task.getStatus() != TaskStatus.DONE)
                .count();
        return new TaskStats(tasks.size(), tasks.size() - completed, overdue, completed);
    }
}
