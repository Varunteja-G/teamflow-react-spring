package com.varunteja.teamflow.repository;

import com.varunteja.teamflow.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
