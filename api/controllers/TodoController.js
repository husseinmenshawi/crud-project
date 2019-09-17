/**
 * To-doController
 *
 * @description :: Server-side logic for managing to-does
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createTodo:(req,res)=>{
    console.log('created Todo!')
    let todo_details = {
      todo_title : req.body.todo_title,
      todo_desc : req.body.todo_desc
    }

    Todo.create(todo_details).exec((err)=>{
      if(err) return res.serverError(err)

      req.flash(
        'Todo Created!'
        );
      res.redirect('/')
    });

  },

  editTodo:(req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    let todo_id = req.params.id;
    let todo_update = {
      todo_title : req.body.todo_title,
      todo_desc : req.body.todo_desc
    }

    Todo.update({id:todo_id},todo_update).exec((err)=>{
      if(err) return res.serverError(err)

      res.redirect('/todo/viewTodo')
    });
  },

  deleteTodo:(req,res)=>{
    let todo_id = req.params.id;

    Todo.destroy({id:todo_id}).exec((err)=>{
      if (err) return res.serverError(err)


      res.redirect('/todo/viewTodo')
    });
  },
  // to view all todos
  viewTodo:(req,res)=>{
      Todo.find({}).exec((err,todo)=>{
      if(err) return res.serverError(err)

      res.view('viewTodo',{todo:todo});
    })

  },

  //to view todo by id
  viewTodoById: (req,res)=>{
    let todo_id = req.params.id

    Todo.find({id:todo_id}).exec((err,todo)=>{
      if(err) return res.serverError(err)

      res.view('viewSpecificTodo',{todo:todo});
    })
  },

  editPage:(req,res)=>{
    let todo_id = req.params.id;
    Todo.find({id:todo_id}).exec((err,todo)=>{
      if(err) return res.serverError(err)
      console.log(todo[0].todo_desc)
      console.log(todo[0].todo_title)
      console.log(todo[0].id)
      res.view('editTodo',{
        todo_id: todo[0].id,
        todo_title: todo[0].todo_title,
        todo_desc: todo[0].todo_desc
      });
    })


  },





};

