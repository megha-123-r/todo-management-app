package com.jthread.todoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jthread.todoapp.model.Task;
import com.jthread.todoapp.model.Task.Priority;
import com.jthread.todoapp.model.Task.Status;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

	List<Task> findByTitleContainingIgnoreCase(String title);

	List<Task> findByPriority(Priority priority);

	List<Task> findByStatus(Status status);
}
