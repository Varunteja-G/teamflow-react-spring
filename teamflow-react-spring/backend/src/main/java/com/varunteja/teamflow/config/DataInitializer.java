package com.varunteja.teamflow.config;

import com.varunteja.teamflow.model.Task;
import com.varunteja.teamflow.model.TaskPriority;
import com.varunteja.teamflow.model.TaskStatus;
import com.varunteja.teamflow.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedTasks(TaskRepository repository) {
        return args -> {
            if (repository.count() > 0) return;
            repository.saveAll(List.of(
                    task("Build dashboard API", "Create aggregate metrics for the project dashboard.", "Varun", TaskStatus.DONE, TaskPriority.HIGH, LocalDate.now().minusDays(2)),
                    task("Implement task filters", "Support status, priority, and keyword filtering.", "Maya", TaskStatus.IN_PROGRESS, TaskPriority.HIGH, LocalDate.now().plusDays(2)),
                    task("Review accessibility", "Check keyboard navigation, labels, and contrast.", "Jordan", TaskStatus.REVIEW, TaskPriority.MEDIUM, LocalDate.now().plusDays(4)),
                    task("Add Docker deployment", "Containerize the frontend, backend, and PostgreSQL database.", "Varun", TaskStatus.TODO, TaskPriority.CRITICAL, LocalDate.now().plusDays(6))
            ));
        };
    }

    private Task task(String title, String description, String assignee, TaskStatus status,
                      TaskPriority priority, LocalDate dueDate) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setAssignee(assignee);
        task.setStatus(status);
        task.setPriority(priority);
        task.setDueDate(dueDate);
        return task;
    }
}
